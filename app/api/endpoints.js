const BASE_URL = "https://statsapi.mlb.com/api/"

const endpoints = {
    person: {
        url: `${BASE_URL}{ver}/people/{personId}`,
        path_params: {
            ver: {
                type: String,
                default: "v1",
                leading_slash: False,
                trailing_slash: False,
                required: True,
            },
            personId: {
                type: String,
                default: None,
                leading_slash: False,
                trailing_slash: False,
                required: True,
            },
        },
        query_params: [hydrate, fields],
        required_params: [[]],
    },
    person_stats: {
        url: `${BASE_URL}{ver}/people/{personId}/stats/game/{gamePk}`,
        path_params: {
            ver: {
                type: String,
                default: "v1",
                leading_slash: False,
                trailing_slash: False,
                required: True,
            },
            personId: {
                type: String,
                default: None,
                leading_slash: False,
                trailing_slash: False,
                required: True,
            },
            gamePk: {
                type: String,
                default: None,
                leading_slash: False,
                trailing_slash: False,
                required: True,
            },
        },
        query_params: [fields],
        required_params: [[]],
    },
}