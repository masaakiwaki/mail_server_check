from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import mail_server_check 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],      
    allow_headers=["*"]
)

class Data(BaseModel):
    account: str
    password: str
    smtp_server: str
    smtp_auth_type: str


@app.post('/')
def calc(data: Data):

    result, error_object = mail_server_check.setting_check(
            account = data.account, 
            password = data.password, 
            smtp_server = data.smtp_server,
            smtp_auth_type = data.smtp_auth_type
            )

    if result == 'ok':
        return_json = {
            'result': result
        }
        
    elif result == 'failure':
        return_json = {
            'result': result,
            'error_type': str(type(error_object)),
            'error_args': str(error_object.args),
            'error_info': str(error_object)
        }

    return return_json