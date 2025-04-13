const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { format, addDays, isWeekend } = require('date-fns');

// Конфигурация
const START_DATE = new Date(2023, 8, 6); // 1 января 2023
const END_DATE = new Date(); // Сегодня
const REPO_NAME = 'git-train';
const COMMIT_MESSAGES = [
  "Update README",
  "Fix typo",
  "Refactor code",
  "Add new feature",
  "Optimize performance",
  "Fix bug",
  "Update dependencies",
  "Improve documentation"
];

// Создаем временную папку для репозитория
const repoPath = path.join(__dirname, REPO_NAME);
if (!fs.existsSync(repoPath)) {
  fs.mkdirSync(repoPath);
}

process.chdir(repoPath);

// Инициализируем Git репозиторий
function initRepo() {
  execSync('git init');
  
  // Создаем README
  fs.writeFileSync('README.md', '# GitHub Activity Generator\n\nAuto-generated commits');
  execSync('git add README.md');
  execSync('git commit -m "Initial commit"');
  
  console.log('Repository initialized');
}

// Генерируем коммиты
function generateCommits() {
  let currentDate = START_DATE;
  
  while (currentDate <= END_DATE) {
    // Пропускаем выходные (опционально)
    if (!isWeekend(currentDate)) {
      // Случайное количество коммитов (1-3 в день)
      const commitsCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < commitsCount; i++) {
        // Случайное сообщение коммита
        const message = COMMIT_MESSAGES[
          Math.floor(Math.random() * COMMIT_MESSAGES.length)
        ];
        
        // Устанавливаем дату коммита
        const dateStr = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
        
        // Создаем или изменяем файл
        fs.appendFileSync('activity.log', `${new Date().toISOString()}\n`);
        
        // Добавляем изменения
        execSync('git add .');
        
        // Коммитим с указанной датой
        execSync(`git commit -m "${message}" --date "${dateStr}"`);
        
        console.log(`Created commit: ${dateStr} - ${message}`);
      }
    }
    
    // Переходим к следующему дню
    currentDate = addDays(currentDate, 1);
  }
}

// Основная функция
function main() {
  try {
    initRepo();
    generateCommits();
    console.log('\nDone! Now you can:');
    console.log(`1. cd ${REPO_NAME}`);
    console.log('2. git remote add origin YOUR_REPO_URL');
    console.log('3. git push -u origin main');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();