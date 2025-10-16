const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const skillInput = document.getElementById('skillInput');
const skillTags = document.getElementById('skillTags');
let skills = [];

// Add skill when pressing Enter
skillInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const skill = skillInput.value.trim();
    if (skill && !skills.includes(skill)) {
      skills.push(skill);
      renderSkills();
      updatePreview();
    }
    skillInput.value = '';
  }
});

// Remove a skill
function removeSkill(skill) {
  skills = skills.filter(s => s !== skill);
  renderSkills();
  updatePreview();
}

// Render skill tags
function renderSkills() {
  skillTags.innerHTML = '';
  skills.forEach(skill => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `${skill} <span onclick="removeSkill('${skill}')">×</span>`;
    skillTags.appendChild(tag);
  });
}

function updatePreview() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const about = document.getElementById('about').value;
  const project1 = document.getElementById('project1').value;
  const desc1 = document.getElementById('desc1').value;
  const project2 = document.getElementById('project2').value;
  const desc2 = document.getElementById('desc2').value;

  preview.innerHTML = `
    <h1>${name || ''}</h1>
    <h2>${title || ''}</h2>
    <p>${about || ''}</p>
    ${skills.length ? `<h3>Skills</h3><ul>${skills.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
    <h3>Projects</h3>
    <ul>
      ${project1 ? `<li><strong>${project1}</strong>: ${desc1}</li>` : ''}
      ${project2 ? `<li><strong>${project2}</strong>: ${desc2}</li>` : ''}
    </ul>
  `;
}

downloadBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const about = document.getElementById('about').value;
  const project1 = document.getElementById('project1').value;
  const desc1 = document.getElementById('desc1').value;
  const project2 = document.getElementById('project2').value;
  const desc2 = document.getElementById('desc2').value;

  const htmlContent = `<!DOCTYPE html>
<html lang='en'>
<head>
<meta charset='UTF-8'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<title>${name}'s Portfolio</title>
<style>
body {font-family: Arial, sans-serif; background: #f0f2f5; color: #333; padding: 20px;}
h1 {color: #007bff;}
h2 {margin-top: -10px; color: #555;}
h3 {margin-top: 20px; border-bottom: 1px solid #ddd;}
ul {list-style-type: square; padding-left: 20px;}
</style>
</head>
<body>
  <h1>${name}</h1>
  <h2>${title}</h2>
  <p>${about}</p>
  ${skills.length ? `<h3>Skills</h3><ul>${skills.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}
  <h3>Projects</h3>
  <ul>
    ${project1 ? `<li><strong>${project1}</strong>: ${desc1}</li>` : ''}
    ${project2 ? `<li><strong>${project2}</strong>: ${desc2}</li>` : ''}
  </ul>
  <script>console.log('Portfolio Loaded');<\\/script>
</body>
</html>`;

  const zip = new JSZip();
  zip.file('portfolio.html', htmlContent);
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'portfolio.zip');
});

document.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', updatePreview));
updatePreview();
