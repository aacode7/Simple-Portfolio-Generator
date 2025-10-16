const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');
const skillInput = document.getElementById('skillInput');
const skillTags = document.getElementById('skillTags');
const addSkillBtn = document.getElementById('addSkillBtn');
let skills = [];

// Add skill when pressing Add button
addSkillBtn.addEventListener('click', () => {
  const skill = skillInput.value.trim();
  if (skill && !skills.includes(skill)) {
    skills.push(skill);
    renderSkills();
    updatePreview();
  }
  skillInput.value = '';
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
    <h1>${escapeHtml(name) || ''}</h1>
    <h2>${escapeHtml(title) || ''}</h2>
    <p>${escapeHtml(about) || ''}</p>
    ${skills.length ? `<h3>Skills</h3><ul>${skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>` : ''}
    <h3>Projects</h3>
    <ul>
      ${project1 ? `<li><strong>${escapeHtml(project1)}</strong>: ${escapeHtml(desc1)}</li>` : ''}
      ${project2 ? `<li><strong>${escapeHtml(project2)}</strong>: ${escapeHtml(desc2)}</li>` : ''}
    </ul>
  `;
}

// Escape HTML characters (safety)
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Generate downloadable HTML file directly (no ZIP)
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
<title>${escapeHtml(name)}'s Portfolio</title>
<style>
body {font-family: Arial, sans-serif; background: #f0f2f5; color: #333; padding: 20px;}
h1 {color: #007bff;}
h2 {margin-top: -10px; color: #555;}
h3 {margin-top: 20px; border-bottom: 1px solid #ddd;}
ul {list-style-type: square; padding-left: 20px;}
footer {margin-top: 30px; font-size: 12px; color: #888; text-align: center;}
</style>
</head>
<body>
  <h1>${escapeHtml(name)}</h1>
  <h2>${escapeHtml(title)}</h2>
  <p>${escapeHtml(about)}</p>
  ${skills.length ? `<h3>Skills</h3><ul>${skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul>` : ''}
  <h3>Projects</h3>
  <ul>
    ${project1 ? `<li><strong>${escapeHtml(project1)}</strong>: ${escapeHtml(desc1)}</li>` : ''}
    ${project2 ? `<li><strong>${escapeHtml(project2)}</strong>: ${escapeHtml(desc2)}</li>` : ''}
  </ul>
  <footer>Generated with Portfolio Generator 🔥</footer>
  <script>console.log('Portfolio Loaded');<\/script>
</body>
</html>`;

  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    if (typeof saveAs === 'function') {
      saveAs(blob, 'portfolio.html');
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio.html';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    alert('Error creating file: ' + err);
  }
});

document.querySelectorAll('input, textarea').forEach(i => i.addEventListener('input', updatePreview));
updatePreview();
