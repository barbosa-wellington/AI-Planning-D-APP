// project-mapper.js
// Run this script in your project root directory with: node project-mapper.js

const fs = require('fs');
const path = require('path');

// Directories and files to ignore
const IGNORE_ITEMS = [
  'node_modules',
  '.git',
  '.expo',
  'dist',
  'build',
  '.next',
  'coverage',
  '.nyc_output',
  '.DS_Store',
  'Thumbs.db',
  '*.log',
  '.env',
  '.env.local',
  '.env.production',
  '.vscode',
  '.idea',
  '__pycache__',
  '*.pyc',
  '.pytest_cache'
];

// File extensions to include content for
const INCLUDE_CONTENT_EXTENSIONS = [
  '.js', '.jsx', '.ts', '.tsx',
  '.json', '.md', '.txt',
  '.yml', '.yaml', '.xml',
  '.css', '.scss', '.sass'
];

// Maximum file size to include content (in bytes)
const MAX_FILE_SIZE = 10000; // 10KB

function shouldIgnore(itemName) {
  return IGNORE_ITEMS.some(ignore => {
    if (ignore.includes('*')) {
      const pattern = ignore.replace('*', '');
      return itemName.includes(pattern);
    }
    return itemName === ignore;
  });
}

function shouldIncludeContent(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return INCLUDE_CONTENT_EXTENSIONS.includes(ext);
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function mapDirectory(dirPath, indent = '') {
  let result = '';
  
  try {
    const items = fs.readdirSync(dirPath);
    
    items.forEach((item, index) => {
      if (shouldIgnore(item)) return;
      
      const itemPath = path.join(dirPath, item);
      const isLast = index === items.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const nextIndent = indent + (isLast ? '    ' : '│   ');
      
      try {
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          result += `${indent}${connector}📁 ${item}/\n`;
          result += mapDirectory(itemPath, nextIndent);
        } else {
          const fileSize = stats.size;
          const sizeStr = fileSize > 1024 ? `${(fileSize/1024).toFixed(1)}KB` : `${fileSize}B`;
          result += `${indent}${connector}📄 ${item} (${sizeStr})\n`;
        }
      } catch (error) {
        result += `${indent}${connector}❌ ${item} (access denied)\n`;
      }
    });
  } catch (error) {
    result += `${indent}❌ Error reading directory: ${error.message}\n`;
  }
  
  return result;
}

function getImportantFileContents(dirPath) {
  const importantFiles = [
    'package.json',
    'App.js',
    'App.jsx',
    'App.ts',
    'App.tsx',
    'app.json',
    'expo.json',
    'README.md',
    'babel.config.js',
    'metro.config.js'
  ];
  
  let result = '\n📋 IMPORTANT FILE CONTENTS:\n';
  result += '='.repeat(50) + '\n\n';
  
  function searchFiles(currentPath) {
    try {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        if (shouldIgnore(item)) return;
        
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory() && currentPath.split(path.sep).length < 4) {
          // Only search 3 levels deep
          searchFiles(itemPath);
        } else if (stats.isFile()) {
          const relativePath = path.relative(dirPath, itemPath);
          
          // Check if it's an important file or has important extension
          const isImportant = importantFiles.includes(item) || 
                            shouldIncludeContent(itemPath);
          
          if (isImportant && stats.size <= MAX_FILE_SIZE) {
            try {
              const content = fs.readFileSync(itemPath, 'utf8');
              result += `📄 ${relativePath}\n`;
              result += '-'.repeat(relativePath.length + 2) + '\n';
              result += content;
              result += '\n' + '='.repeat(50) + '\n\n';
            } catch (error) {
              result += `📄 ${relativePath}\n`;
              result += `❌ Error reading file: ${error.message}\n\n`;
            }
          }
        }
      });
    } catch (error) {
      // Skip directories we can't read
    }
  }
  
  searchFiles(dirPath);
  return result;
}

function generateProjectMap() {
  const projectPath = process.cwd();
  const projectName = path.basename(projectPath);
  
  console.log('🗺️  Generating project structure map...\n');
  
  let output = '';
  output += `🚀 PROJECT: ${projectName}\n`;
  output += `📍 PATH: ${projectPath}\n`;
  output += `📅 GENERATED: ${new Date().toLocaleString()}\n\n`;
  output += '📁 PROJECT STRUCTURE:\n';
  output += '='.repeat(50) + '\n';
  
  // Generate directory tree
  output += mapDirectory(projectPath);
  
  // Add important file contents
  output += getImportantFileContents(projectPath);
  
  // Save to file
  const outputFile = 'project-map.txt';
  fs.writeFileSync(outputFile, output);
  
  console.log(`✅ Project map generated successfully!`);
  console.log(`📄 Saved to: ${outputFile}`);
  console.log(`📊 Total characters: ${output.length}`);
  console.log('\n📋 You can now copy the contents of project-map.txt and share it with Claude!');
  
  return output;
}

// Run the script
if (require.main === module) {
  try {
    generateProjectMap();
  } catch (error) {
    console.error('❌ Error generating project map:', error.message);
    process.exit(1);
  }
}

module.exports = { generateProjectMap };