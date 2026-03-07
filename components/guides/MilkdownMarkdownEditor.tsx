'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface MilkdownMarkdownEditorHandle {
  insertMarkdown: (markdown: string, inline?: boolean) => void;
  setMarkdown: (markdown: string) => void;
  getMarkdown: () => string;
}

interface MilkdownMarkdownEditorProps {
  value: string;
  onChange: (markdown: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

type MilkdownRuntime = {
  crepe: {
    create: () => Promise<unknown>;
    destroy: () => Promise<unknown>;
    setReadonly: (value: boolean) => unknown;
    getMarkdown: () => string;
    on: (fn: (listener: { markdownUpdated: (cb: (ctx: unknown, markdown: string) => void) => void }) => void) => unknown;
    editor: {
      action: (action: unknown) => unknown;
    };
  };
  insert: (markdown: string, inline?: boolean) => unknown;
  replaceAll: (markdown: string, flush?: boolean) => unknown;
};

function joinClasses(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export const MilkdownMarkdownEditor = forwardRef<MilkdownMarkdownEditorHandle, MilkdownMarkdownEditorProps>(
  function MilkdownMarkdownEditor(
    { value, onChange, placeholder = 'Start writing...', readOnly = false, className },
    ref
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const runtimeRef = useRef<MilkdownRuntime | null>(null);
    const latestMarkdownRef = useRef(value);
    const syncingRef = useRef(false);
    const onChangeRef = useRef(onChange);
    const [isReady, setIsReady] = useState(false);

    useImperativeHandle(ref, () => ({
      insertMarkdown(markdown: string, inline = false) {
        const runtime = runtimeRef.current;
        if (!runtime) return;
        runtime.crepe.editor.action(runtime.insert(markdown, inline));
      },
      setMarkdown(markdown: string) {
        const runtime = runtimeRef.current;
        latestMarkdownRef.current = markdown;
        if (!runtime) return;
        syncingRef.current = true;
        runtime.crepe.editor.action(runtime.replaceAll(markdown));
        syncingRef.current = false;
      },
      getMarkdown() {
        const runtime = runtimeRef.current;
        return runtime ? runtime.crepe.getMarkdown() : latestMarkdownRef.current;
      },
    }), []);

    useEffect(() => {
      latestMarkdownRef.current = value;
    }, [value]);

    useEffect(() => {
      onChangeRef.current = onChange;
    }, [onChange]);

    useEffect(() => {
      if (!hostRef.current) return;

      let cancelled = false;

      const setup = async () => {
        const [{ Crepe }, { replaceAll, insert }] = await Promise.all([
          import('@milkdown/crepe'),
          import('@milkdown/kit/utils'),
        ]);

        if (!hostRef.current || cancelled) return;

        const crepe = new Crepe({
          root: hostRef.current,
          defaultValue: value,
          featureConfigs: {
            [Crepe.Feature.Placeholder]: {
              text: placeholder,
              mode: 'doc',
            },
          },
        });

        runtimeRef.current = { crepe, replaceAll, insert } as MilkdownRuntime;

        crepe.on((listener) => {
          listener.markdownUpdated((_ctx, markdown) => {
            latestMarkdownRef.current = markdown;
            if (!syncingRef.current) {
              onChangeRef.current(markdown);
            }
          });
        });

        await crepe.create();
        if (cancelled) {
          await crepe.destroy();
          return;
        }

        crepe.setReadonly(readOnly);
        setIsReady(true);
      };

      void setup().catch((error) => {
        console.error('Failed to initialize Milkdown editor:', error);
      });

      return () => {
        cancelled = true;
        setIsReady(false);
        const runtime = runtimeRef.current;
        runtimeRef.current = null;
        if (runtime) {
          void runtime.crepe.destroy().catch((error) => {
            console.error('Failed to destroy Milkdown editor:', error);
          });
        }
        if (hostRef.current) {
          hostRef.current.innerHTML = '';
        }
      };
    }, [placeholder]);

    useEffect(() => {
      const runtime = runtimeRef.current;
      if (!runtime) return;
      runtime.crepe.setReadonly(readOnly);
    }, [readOnly]);

    useEffect(() => {
      const runtime = runtimeRef.current;
      if (!runtime) return;
      if (value === latestMarkdownRef.current) return;

      syncingRef.current = true;
      runtime.crepe.editor.action(runtime.replaceAll(value));
      latestMarkdownRef.current = value;
      syncingRef.current = false;
    }, [value]);

    return (
      <div className={joinClasses('guide-milkdown-shell', className, !isReady && 'guide-milkdown-shell-loading')}>
        {!isReady && <div className="guide-milkdown-loading">Loading editor...</div>}
        <div ref={hostRef} className="guide-milkdown-host" />
      </div>
    );
  }
);
