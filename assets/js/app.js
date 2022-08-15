const data = [
  {
    id: 1,
    getappname: "Extra Spaces Remover tool",
    getappdesc: "Tegor International",
    getappversion: "1.2.0",
    getapplogo: "./imgs/headlogo.png"
  }
  ];
 data;
const appInformation = myinfo => {
  // Create elements needed to build a card
  const appLogo = document.createElement("img");
  const appName = document.createElement("h2");
  const div1 = document.createElement("div");
  const desc = document.createElement("span");
  const vrline = document.createElement("span");
  const appVersion = document.createElement("a");
  // Append newly created elements into the DOM
  const applicationInfo = document.querySelector(".app-info");
  
  applicationInfo.append(appLogo);
  applicationInfo.append(appName);
  applicationInfo.append(div1);
  div1.append(desc);
  div1.append(vrline);
  div1.append(appVersion);
  
  appName.setAttribute("class", "text-lg text-gray-900 font-medium title-font mb-2 text-c");
  div1.setAttribute("class", "flex");
  desc.setAttribute("class", "flex items-center text-sm");
  vrline.setAttribute("class", "flex ml-3 pl-3 py-2 border-l-2 border-gray-300 space-x-2s");
  appVersion.setAttribute("class", "icon text-gray-500 text-base");
  appLogo.setAttribute("src", myinfo.getapplogo);
  
  appLogo.setAttribute("class", "w-32");
  appName.innerHTML = myinfo.getappname;
  desc.innerHTML = "Powered by: " + myinfo.getappdesc;
  appVersion.innerHTML = "Version: " + myinfo.getappversion;
  
};
data.forEach(myinfo => appInformation(myinfo));
//import data from "/src/storedata.js";
