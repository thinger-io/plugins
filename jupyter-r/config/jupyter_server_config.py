# Configuration file for jupyter-notebook.

#------------------------------------------------------------------------------
# NotebookApp(JupyterApp) configuration
#------------------------------------------------------------------------------

## Allow password to be changed at login for the notebook server.
#
#                      While logging in with a token, the notebook server UI will give the opportunity to
#                      the user to enter a new password at the same time that will replace
#                      the token login mechanism.
#
#                      This can be set to false to prevent changing password from
#  the UI/API.
#  Default: True
c.ServerApp.allow_password_change = False

## The base URL for the notebook server.
#
#                                 Leading and trailing slashes can be omitted,
#                                 and will automatically be added.
#  Default: '/'
import os
c.ServerApp.base_url = f"/users/{os.environ['THINGER_USER']}/plugins/{os.environ['THINGER_PLUGIN']}/"

## If True, display a button in the dashboard to quit
#          (shutdown the notebook server).
#  Default: True
c.ServerApp.quit_button = False

## Token used for authenticating first-time connections to the server.
#
#          The token can be read from the file referenced by JUPYTER_TOKEN_FILE or set directly
#          with the JUPYTER_TOKEN environment variable.
#
#          When no password is enabled,
#          the default is to generate a new, random token.
#
#          Setting to an empty string disables authentication altogether, which
#  is NOT RECOMMENDED.
#  Default: '<generated>'
c.ServerApp.token = ''

