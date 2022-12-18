import smtplib

def setting_check(account :str, 
                  password :str, 
                  smtp_server :str,
                  smtp_auth_type :str = None,
                  ):
  """メール送信テスト
  args:
  accout (str): 認証アカウント
  password (str): 認証パスワード
  smtp_server (str): SMTPサーバー名
  smtp_auth_type (str): 認証方式
  """
  
  CHECK_TIMEOUT = 5
  
  try:
    if smtp_auth_type == 'ssl':
      server = smtplib.SMTP_SSL(smtp_server, timeout=CHECK_TIMEOUT)
    else:
        server = smtplib.SMTP(smtp_server, timeout=CHECK_TIMEOUT)
        if smtp_auth_type == 'starttls':
          server.starttls()
    
    #server.set_debuglevel(2)
    server.login(account, password)
    server.quit()
    return 'ok', None
  
  except Exception as E:
    return 'failure', E


    