from checkio_referee import RefereeCodeGolf
from checkio_referee import covercodes, ENV_NAME


import settings_env
from tests import TESTS


class Referee(RefereeCodeGolf):
    DEFAULT_MAX_CODE_LENGTH = 200
    MAX_CODE_LENGTHS = {
        ENV_NAME.JS_NODE: 230
    }
    BASE_POINTS = 10
    TESTS = TESTS
    ENVIRONMENTS = settings_env.ENVIRONMENTS

    DEFAULT_FUNCTION_NAME = "golf"
