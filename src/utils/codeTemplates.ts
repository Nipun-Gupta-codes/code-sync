
export const codeTemplates = {
  javascript: `// Hello World in JavaScript
console.log("Hello, World!");`,
  
  python: `# Hello World in Python
print("Hello, World!")`,
  
  java: `// Hello World in Java
class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  
  cpp: `// Hello World in C++
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`
};

export const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' }
];

export const themes = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'vs-light', label: 'Light' },
  { value: 'hc-black', label: 'High Contrast' }
];
