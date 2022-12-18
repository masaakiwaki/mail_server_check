let displapyInfo = document.getElementById("displapyInfo");

const generateInputElement = (createKey, createValue) => {
  let blockItem = document.createElement("div");
  blockItem.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");

  let itemNameDisplay = document.createElement("label");
  itemNameDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
  itemNameDisplay.innerHTML = createValue;
  blockItem.appendChild(itemNameDisplay);

  let itemNameInput = document.createElement("input");
  itemNameInput.setAttribute("class", "displapyInfoChild displapyInfoChildInput");
  itemNameInput.setAttribute("id", createKey);
  blockItem.appendChild(itemNameInput);

  displapyInfo.appendChild(blockItem);
}

generateCheckInfo = {
  "account": "ユーザー名",
  "password": "パスワード",
  "smtp_server": "SMTPサーバー名",
  "smtp_auth_type": "暗号化方式"
}

for (let key in generateCheckInfo){
  if (key == "smtp_auth_type"){
  } else {
    generateInputElement(key, generateCheckInfo[key]);
  }
}


const generateInputRadioElement = (authTypeArray) => {
  let blockItem = document.createElement("div");
  blockItem.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");
  blockItem.innerHTML = '暗号化方式　'

  for (let i in authTypeArray){
    let authTypeLabel = document.createElement("label")
    authTypeLabel.innerHTML = `${authTypeArray[i]} `;

    let authTypeDisplay = document.createElement("input");
    authTypeDisplay.setAttribute("type", "radio");
    authTypeDisplay.setAttribute("value", authTypeArray[i]);
    authTypeDisplay.setAttribute("name", "authTypeGroup");
    if (authTypeArray[i] == ''){
      authTypeDisplay.setAttribute("value", 'None')
      authTypeLabel.innerHTML = '暗号化なし';
    }
    // authTypeDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");

    blockItem.appendChild(authTypeDisplay)
    blockItem.appendChild(authTypeLabel)

  }
  displapyInfo.appendChild(blockItem);
}

let authTypeArray = ['ssl', 'starttls', '']

generateInputRadioElement(authTypeArray)



const generateButtonElement = (createKey, createValue) => {
  let blockButton = document.createElement("div");
  blockButton.setAttribute("class", "displapyInfoChild displapyInfoChildBlock displapyInfoChildBlockButton");

  let generateButton = document.createElement("a");
  generateButton.innerHTML = createValue;
  generateButton.setAttribute("class", "original-button");
  generateButton.setAttribute("id", createKey);
  generateButton.setAttribute("value", createKey);
  blockButton.appendChild(generateButton);

  displapyInfo.appendChild(blockButton);
}


generateButtonElement("checkSmtpServer", "確認");


let button = document.getElementById('checkSmtpServer');
button.addEventListener('click', checkApi);

async function checkApi() {
  let jsonData = {}
  for (let key in generateCheckInfo){
    if (key == 'smtp_auth_type') {

      let authRadioElements = document.getElementsByName('authTypeGroup');
    
      for (let i = 0; i < authRadioElements.length; i++){
          if (authRadioElements.item(i).checked){
            jsonData[key] = authRadioElements.item(i).value;
          }
      }


    } else {
      jsonData[key] = document.getElementById(key).value
    }
  }

  console.log(jsonData)

  
  let jsonText = JSON.stringify(jsonData);

  let URL = "https://wwwxci.deta.dev/"

  let responseJson = ""
  responseJson = await fetchData(url=URL, data=jsonText)
  
  if (document.getElementById("displapyInfoResult")) {
    document.getElementById("displapyInfoResult").remove()
  }

  let displapyResult = document.createElement("div")
  displapyResult.setAttribute("id", "displapyInfoResult")

  for (let key in responseJson){
    console.log(key)
    console.log(responseJson[key])

    let blockItem = document.createElement("div");
    blockItem.setAttribute("class", "displapyInfoChild displapyInfoChildBlock");
    blockItem.setAttribute("id", "result");
  
    let itemNameDisplay = document.createElement("label");
    itemNameDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
    itemNameDisplay.setAttribute("id", key);
    itemNameDisplay.innerHTML = key;
    blockItem.appendChild(itemNameDisplay);

    itemNameDisplay = document.createElement("label");
    itemNameDisplay.setAttribute("class", "displapyInfoChild displapyInfoChildLabel");
    itemNameDisplay.setAttribute("id", `${key}Value`);
    itemNameDisplay.innerHTML = responseJson[key];
    blockItem.appendChild(itemNameDisplay);

    displapyResult.appendChild(blockItem);
  
  }

  displapyInfo.appendChild(displapyResult);


}


async function fetchData(url, data){
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  let responseJson = await response.json();
  return responseJson

}



  