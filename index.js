const run = () => {
  const templateData = getTemplateData();
  const template = prepareTemplate(templateData);

  const frame = document.getElementById("preview-window").contentWindow
    .document;
  frame.open();
  frame.write(template);
  frame.close();
};

const save = () => {
  const templateName = prompt(
    "Lütfen template ismini giriniz",
    new Date().toLocaleString()
  );

  if (!templateName) {
    return alert("Lütfen template adı giriniz!");
  }

  let templates = [];

  const localTemplates = window.localStorage.getItem("templates");

  if (localTemplates) {
    templates = JSON.parse(localTemplates);
  }

  const templateData = getTemplateData();

  templates.push({ ...templateData, name: templateName });

  window.localStorage.setItem("templates", JSON.stringify(templates));
  window.localStorage.setItem("currentTemplate", templateName);
  window.location.reload();  

};

const insert = ({ html, js, css }) => {
  document.getElementById("htmlCode").value = html;
  document.getElementById("cssCode").value = css;
  document.getElementById("jsCode").value = js;
};

const setHistory = (templates, currentTemplateName) => {
 const select = document.getElementById("history");
 
  for (const template of templates) {
    const option = document.createElement("option");
    option.text = template.name;
    option.value = template.name;
    select.appendChild(option);
  }

  select.value = currentTemplateName;
};


const onHistoryChange = (e) => {
    if(e.target.value ) {
        window.localStorage.setItem('currentTemplate', e.target.value);
        window.location.reload();   
    }
}

const onKeyUpListener =  (e) => {
    const key = e.keyCode;
    // Command + S tarayıcı eventini çalıştırıyor ek olarak
    if(key == 83 && e.metaKey){
        run()
    }
}

const load = () => {
  document.getElementById("runButton").onclick = run;
  document.getElementById("saveButton").onclick = save;
  document.getElementById("history").onchange = onHistoryChange;
  document.addEventListener("keydown", onKeyUpListener, false);

  const currentTemplateName = window.localStorage.getItem("currentTemplate");
  const templates = JSON.parse(window.localStorage.getItem("templates"));

  if (templates && templates.length) {
    const currentTemplate = templates.find(
      (v) => v["name"] == currentTemplateName
    );
    insert(currentTemplate);
    setHistory(templates, currentTemplateName);
    run();
  }
};

window.onload = load;
