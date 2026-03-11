import json
from pathlib import Path

p = Path('docs/openapi.json')
data = json.loads(p.read_text(encoding='utf-8'))
paths = data.setdefault('paths', {})
schemas = data.setdefault('components', {}).setdefault('schemas', {})
responses = data.setdefault('components', {}).setdefault('responses', {})

responses.setdefault('Unauthorized', {
    'description': 'Требуется авторизация',
    'content': {'application/json': {'schema': {'type': 'object', 'properties': {'error': {'type': 'string'}}}}},
})
responses.setdefault('BadRequest', {
    'description': 'Неверный запрос',
    'content': {'application/json': {'schema': {'type': 'object', 'properties': {'error': {'type': 'string'}}}}},
})

schemas['AuthUser'] = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'nickname': {'type': 'string'},
        'role': {'type': 'string', 'enum': ['guest', 'member', 'officer', 'head', 'sysadmin']},
        'isActive': {'type': 'boolean'},
        'authMethod': {'type': 'string', 'enum': ['account', 'pin']},
        'discordId': {'type': 'string', 'nullable': True},
        'discordHandle': {'type': 'string', 'nullable': True},
        'className': {'type': 'string', 'nullable': True},
        'prefix': {'type': 'string', 'nullable': True},
        'exp': {'type': 'number'},
    },
    'required': ['role'],
}
schemas['AuthResponse'] = {
    'type': 'object',
    'properties': {
        'success': {'type': 'boolean'},
        'user': {'$ref': '#/components/schemas/AuthUser'},
    },
    'required': ['success', 'user'],
}
schemas['RegisterAuthUser'] = {
    'allOf': [
        {'$ref': '#/components/schemas/AuthUser'},
        {'type': 'object', 'properties': {'createdAt': {'type': 'string', 'format': 'date-time'}}},
    ]
}
schemas['RegisterResponse'] = {
    'type': 'object',
    'properties': {
        'success': {'type': 'boolean'},
        'pendingApproval': {'type': 'boolean'},
        'message': {'type': 'string'},
        'user': {'$ref': '#/components/schemas/RegisterAuthUser'},
    },
    'required': ['success', 'user'],
}
schemas['VerifyAuthResponse'] = {
    'type': 'object',
    'properties': {
        'valid': {'type': 'boolean'},
        'user': {'$ref': '#/components/schemas/AuthUser'},
    },
    'required': ['valid', 'user'],
}
schemas['LogoutResponse'] = {
    'type': 'object',
    'properties': {'success': {'type': 'boolean'}},
    'required': ['success'],
}
schemas['LoginPayload'] = {
    'type': 'object',
    'properties': {
        'nickname': {'type': 'string'},
        'password': {'type': 'string'},
    },
    'required': ['password'],
}
schemas['RegisterPayload'] = {
    'type': 'object',
    'properties': {
        'nickname': {'type': 'string'},
        'className': {'type': 'string'},
        'discordHandle': {'type': 'string'},
        'password': {'type': 'string'},
    },
    'required': ['nickname', 'className', 'password'],
}
schemas['PortalAccount'] = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'nickname': {'type': 'string'},
        'role': {'type': 'string', 'enum': ['guest', 'member', 'officer', 'head', 'sysadmin']},
        'isActive': {'type': 'boolean'},
        'discordHandle': {'type': 'string', 'nullable': True},
        'prefix': {'type': 'string', 'nullable': True},
        'createdAt': {'type': 'string', 'format': 'date-time'},
        'lastLoginAt': {'type': 'string', 'nullable': True, 'format': 'date-time'},
    },
    'required': ['id', 'nickname', 'role', 'isActive', 'createdAt', 'lastLoginAt'],
}
schemas['UpdatePortalAccount'] = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'isActive': {'type': 'boolean'},
        'role': {'type': 'string', 'enum': ['guest', 'member', 'officer', 'head', 'sysadmin']},
        'prefix': {'type': 'string', 'nullable': True},
    },
    'required': ['id', 'isActive'],
}
schemas['PvpQueueEntry'] = {
    'type': 'object',
    'properties': {
        'playerId': {'type': 'string'},
        'nickname': {'type': 'string'},
        'className': {'type': 'string'},
        'joinedAt': {'type': 'string', 'format': 'date-time'},
    },
    'required': ['playerId', 'nickname', 'className', 'joinedAt'],
}
schemas['PvpRating'] = {
    'type': 'object',
    'properties': {
        'playerId': {'type': 'string'},
        'nickname': {'type': 'string'},
        'rating': {'type': 'number'},
        'wins': {'type': 'number'},
        'losses': {'type': 'number'},
    },
    'required': ['playerId', 'nickname', 'rating', 'wins', 'losses'],
}
schemas['PvpPlayer'] = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'nickname': {'type': 'string'},
        'className': {'type': 'string'},
    },
    'required': ['id', 'nickname', 'className'],
}
schemas['PvpMatch'] = {
    'type': 'object',
    'properties': {
        'id': {'type': 'string'},
        'status': {'type': 'string', 'enum': ['pending', 'completed']},
        'createdAt': {'type': 'string', 'format': 'date-time'},
        'updatedAt': {'type': 'string', 'format': 'date-time'},
        'confirmedAt': {'type': 'string', 'nullable': True, 'format': 'date-time'},
        'winnerId': {'type': 'string', 'nullable': True},
        'playerOne': {'$ref': '#/components/schemas/PvpPlayer'},
        'playerTwo': {'$ref': '#/components/schemas/PvpPlayer'},
        'yourReport': {'type': 'string', 'nullable': True, 'enum': ['win', 'loss']},
        'opponentReport': {'type': 'string', 'nullable': True, 'enum': ['win', 'loss']},
        'confirmationStatus': {'type': 'string', 'enum': ['unreported', 'waiting', 'disputed', 'confirmed']},
    },
    'required': ['id', 'status', 'createdAt', 'updatedAt', 'confirmedAt', 'winnerId', 'playerOne', 'playerTwo', 'yourReport', 'opponentReport', 'confirmationStatus'],
}
schemas['PvpState'] = {
    'type': 'object',
    'properties': {
        'queue': {'type': 'array', 'items': {'$ref': '#/components/schemas/PvpQueueEntry'}},
        'leaderboard': {'type': 'array', 'items': {'$ref': '#/components/schemas/PvpRating'}},
        'recentMatches': {'type': 'array', 'items': {'$ref': '#/components/schemas/PvpMatch'}},
        'activeMatch': {'anyOf': [{'$ref': '#/components/schemas/PvpMatch'}, {'type': 'null'}]},
        'userInQueue': {'type': 'boolean'},
        'userRating': {'anyOf': [{'$ref': '#/components/schemas/PvpRating'}, {'type': 'null'}]},
    },
    'required': ['queue', 'leaderboard', 'recentMatches', 'activeMatch', 'userInQueue', 'userRating'],
}
schemas['PvpReport'] = {
    'type': 'object',
    'properties': {
        'matchId': {'type': 'string'},
        'result': {'type': 'string', 'enum': ['win', 'loss']},
    },
    'required': ['matchId', 'result'],
}

paths['/api/classes'] = {
    'get': {
        'summary': 'Получить список классов',
        'tags': ['Classes'],
        'responses': {
            '200': {'description': 'Успешный ответ', 'content': {'application/json': {'schema': {'type': 'array', 'items': {'type': 'string'}}}}},
        },
    }
}

paths['/api/admin/accounts'] = {
    'get': {
        'summary': 'Получить список аккаунтов портала',
        'tags': ['Accounts'],
        'security': [{'bearerAuth': []}],
        'responses': {
            '200': {'description': 'Успешный ответ', 'content': {'application/json': {'schema': {'type': 'array', 'items': {'$ref': '#/components/schemas/PortalAccount'}}}}},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
    'patch': {
        'summary': 'Обновить аккаунт портала',
        'tags': ['Accounts'],
        'security': [{'bearerAuth': []}],
        'requestBody': {'required': True, 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/UpdatePortalAccount'}}}},
        'responses': {
            '200': {'description': 'Аккаунт обновлен', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PortalAccount'}}}},
            '400': {'$ref': '#/components/responses/BadRequest'},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
}

paths['/api/pvp'] = {
    'get': {
        'summary': 'Получить состояние PvP',
        'tags': ['Pvp'],
        'responses': {
            '200': {'description': 'Успешный ответ', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PvpState'}}}},
            '400': {'$ref': '#/components/responses/BadRequest'},
        },
    },
    'post': {
        'summary': 'Войти в PvP очередь',
        'tags': ['Pvp'],
        'security': [{'bearerAuth': []}],
        'responses': {
            '200': {'description': 'Состояние обновлено', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PvpState'}}}},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
    'delete': {
        'summary': 'Выйти из PvP очереди',
        'tags': ['Pvp'],
        'security': [{'bearerAuth': []}],
        'responses': {
            '200': {'description': 'Состояние обновлено', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PvpState'}}}},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
    'patch': {
        'summary': 'Отправить результат PvP матча',
        'tags': ['Pvp'],
        'security': [{'bearerAuth': []}],
        'requestBody': {'required': True, 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PvpReport'}}}},
        'responses': {
            '200': {'description': 'Состояние обновлено', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/PvpState'}}}},
            '400': {'$ref': '#/components/responses/BadRequest'},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
}

paths['/api/auth'] = {
    'post': {
        'summary': 'Войти в портал',
        'tags': ['Auth'],
        'requestBody': {'required': True, 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/LoginPayload'}}}},
        'responses': {
            '200': {'description': 'Успешный вход', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/AuthResponse'}}}},
            '400': {'$ref': '#/components/responses/BadRequest'},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
}

paths['/api/auth/register'] = {
    'post': {
        'summary': 'Зарегистрировать аккаунт портала',
        'tags': ['Auth'],
        'requestBody': {'required': True, 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/RegisterPayload'}}}},
        'responses': {
            '201': {'description': 'Аккаунт создан', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/RegisterResponse'}}}},
            '400': {'$ref': '#/components/responses/BadRequest'},
        },
    },
}

paths['/api/verify-auth'] = {
    'get': {
        'summary': 'Проверить текущую авторизацию',
        'tags': ['Auth'],
        'responses': {
            '200': {'description': 'Токен валиден', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/VerifyAuthResponse'}}}},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
}

paths['/api/logout'] = {
    'post': {
        'summary': 'Выйти из портала',
        'tags': ['Auth'],
        'responses': {
            '200': {'description': 'Выход выполнен', 'content': {'application/json': {'schema': {'$ref': '#/components/schemas/LogoutResponse'}}}},
            '401': {'$ref': '#/components/responses/Unauthorized'},
        },
    },
}

p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
