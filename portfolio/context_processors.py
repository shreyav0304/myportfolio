import os
import time


def static_version(request):
    """
    Provide a simple version string for cache-busting static assets.
    Prefer commit SHA provided by Vercel; fall back to current epoch time.
    """
    version = (
        os.environ.get('VERCEL_GIT_COMMIT_SHA')
        or os.environ.get('COMMIT_SHA')
        or os.environ.get('STATIC_VERSION')
        or str(int(time.time()))
    )
    return {"STATIC_VERSION": version}
