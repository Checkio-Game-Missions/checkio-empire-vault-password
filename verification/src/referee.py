from checkio_referee import RefereeCodeGolf
from checkio_referee import covercodes, ENV_NAME


import settings_env
from tests import TESTS

py_cover = """def cover(f, data):
    return bool(f(data))
"""


class Referee(RefereeCodeGolf):
    DEFAULT_MAX_CODE_LENGTH = 200
    MAX_CODE_LENGTHS = {
        ENV_NAME.JS_NODE: 230
    }
    BASE_POINTS = 10
    TESTS = TESTS
    ENVIRONMENTS = settings_env.ENVIRONMENTS
    ENV_COVERCODE = {
        ENV_NAME.PYTHON: py_cover
    }

    DEFAULT_FUNCTION_NAME = "golf"
