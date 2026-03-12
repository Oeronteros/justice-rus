import { NextResponse } from 'next/server';

type CorsOptions = {
  methods: string[];
  headers?: string[];
  origin?: string;
};

export function buildCorsHeaders(options: CorsOptions): HeadersInit {
  return {
    'Access-Control-Allow-Origin': options.origin ?? '*',
    'Access-Control-Allow-Methods': [...new Set([...options.methods, 'OPTIONS'])].join(', '),
    'Access-Control-Allow-Headers': (options.headers ?? ['Content-Type', 'Authorization']).join(', '),
  };
}

export function optionsResponse(options: CorsOptions): NextResponse {
  return new NextResponse(null, {
    status: 200,
    headers: buildCorsHeaders(options),
  });
}
