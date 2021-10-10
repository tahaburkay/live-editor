const prepareTemplate = ({ html, css, js }) => {
  return `
      ${html} 
      <style>${css}</style>  
      <script>${js}</script>
    `;
};

const getTemplateData = () => {
  const htmlCode = document.getElementById("htmlCode").value;
  const cssCode = document.getElementById("cssCode").value;
  const jsCode = document.getElementById("jsCode").value;
  return {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  };
};
