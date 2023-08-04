import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeDummificationService {

  private cSharpPattern: RegExp = /^\s*/gm;
  private cSharpClassTypes = [ 'class ', 'interface ', 'struct ', 'enum ', 'record ', ];
  private cSharpBlacklistMethods = [ ]
  private nameMap = new Map<string, string>();


  public getMap(): {key: string, value: string}[] {
    return Array.from(this.nameMap).map(([key, value]) => ({ key, value }));
  }

  public dummify(code: string): string {
    this.nameMap = new Map<string, string>();
    let lines = this.split(code);
    let matches = this.match(lines);

    for (let match of matches) {
      code = code.replace(match, this.parseLine(match));
    }

    let parsedLines = this.split(code);
    let parsedMaches = this.match(parsedLines);

    for (let match of parsedMaches) {
      code = code.replace(match, this.scanLine(match));
    }

    return code;
  }

  public smartify(response: string): string {
    this.nameMap.forEach((value: string, key: string) => {
      response = response.replaceAll(value, key);
    });
    return response;
  }

  private split(code: string): string[] {
    let result = code.split('\n');
    result = result.filter(str => str.trim().length > 1);
    return result;
  }

  private match(lines: string[]): string[] {
    const result: Set<string> = new Set();

    for (const line of lines) {
      const extractedStatement = line.replace(this.cSharpPattern, "");
      result.add(extractedStatement);
    }

    return Array.from(result);
  }

  private parseLine(line: string): string {
    if (this.hasUsing(line)) return line;

    if (this.hasClass(line)) {
      const classType = this.getClassType(line);
      if (classType === null) {
        return line; // show error
      }
      const className = this.getClassName(line, classType);
      if (className.length == 0) {
        return line;
      }
      const entry = this.addEntry(className);
      line = line.replace(className, entry);
    }
    if (this.hasVariableDeclaration(line)) {
      const variableName = this.getVariableDeclarationName(line);
      if (variableName.length === 0) {
        return line;
      }
      const entry = this.addEntry(variableName);
      line = line.replace(variableName, entry);
    }

    if (this.hasMethodDeclaration(line)) {
      const methodName = this.getMethodDeclarationName(line);
      if (methodName.length === 0) {
        return line;
      }
      const entry = this.addEntry(methodName);
      line = line.replace(methodName, entry);
    }

    if (this.hasStringLiteral(line)) {
      const literal = this.getStringLiteral(line);
      if (literal.length === 0) {
        return line;
      }
      const entry = this.addEntry(literal);
      line = line.replace(literal, entry);
    }

    return line;
  }

  private scanLine(line: string): string {
    // this is not a good solution, works for now.
    this.nameMap.forEach((value: string, key: string) => {
      if (line.includes(key)) {
        line = line.replace(key, value);
      }
    });
    return line;
  }

  private addEntry(key: string): string {
    if (this.nameMap.has(key)) {
      return this.nameMap.get(key) as string;
    }

    const entry = `__$${this.nameMap.size}__`;
    this.nameMap.set(key, entry);
    return entry;
  }

  // Rules
  private hasUsing(line: string): boolean {
    return line.includes('using ');
  }

  private hasClass(line: string): boolean {
    return this.cSharpClassTypes.some(className => line.includes(className));
  }

  private hasMethodDeclaration(line: string): boolean {
    return line.includes('(')
      && line.includes(')')
      && !line.includes('.()')
      && !line.includes('().')
      && !line.includes(';')
      && !line.includes('//')
      && !this.isInString(line, '(')
      && !this.isInString(line, ')');
  }

  private hasVariableDeclaration(line: string): boolean{
    return line.includes(";")
      && line.includes("=")
      && !this.isInString(line, ';')
      && !this.isInString(line, '=');
  }

  private hasStringLiteral(line: string): boolean {
    return line.includes('\"')
      && !line.includes('$\"')
      && line.indexOf('\"') !== line.lastIndexOf('\"');
  }

  private isInString(line: string, char: string): boolean {
    const quoteStartIndex = line.indexOf('\"');
    const quoteLastIndex = line.lastIndexOf('\"');
    const charIndex = line.indexOf(char);
    return charIndex > quoteStartIndex && charIndex < quoteLastIndex;
  }

  // Rule Extraction
  private getClassType(line: string): string | null {
    for (const className of this.cSharpClassTypes) {
      if (line.includes(className)) {
        return className;
      }
    }
    return null;
  }

  private getClassName(line: string, classType: string): string {
    const classKeywordIndex = line.indexOf(classType);

    if (classKeywordIndex === -1) {
      // The line does not contain the 'class' keyword.
      return "";
    }

    const startIndex = classKeywordIndex + classType.length;
    const endIndex = line.indexOf(" ", startIndex);

    // If there's no space after the 'class' keyword, endIndex will be -1.
    // In that case, the class name is the rest of the line starting from startIndex.
    return endIndex === -1 ? line.slice(startIndex) : line.slice(startIndex, endIndex);
  }

  private getMethodDeclarationName(line: string): string {
    const paranIndex = line.indexOf("(");
    let nameStartIndex = -1;

    if (paranIndex === -1) {
      return "";
    }

    for (let i = paranIndex; i > 0; i--) {
      if (line[i] === ' ') {
        nameStartIndex = i + 1;
        break;
      }
    }

    if (nameStartIndex === -1) {
      return "";
    }

    return line.substring(nameStartIndex, paranIndex);
  }

  private getStringLiteral(line: string): string {
    const firstIndex = line.indexOf('\"') + 1;
    const lastIndex = line.lastIndexOf('\"');

    if (firstIndex === lastIndex) {
      return "";
    }

    return line.substring(firstIndex, lastIndex);
  }

  private getVariableDeclarationName(line: string): string {
    let equalIndex = line.indexOf("=");
    const hasSpace = line.indexOf(" =") == equalIndex - 1;
    let nameStartIndex = -1;

    if (equalIndex === -1) {
      return "";
    }

    if (hasSpace) {
      equalIndex -= 2;
    }

    for (let i = equalIndex; i > 0; i--) {
      if (line[i] === ' ') {
        nameStartIndex = i + 1;
        break;
      }
    }

    if (nameStartIndex === -1) {
      return "";
    }


    if (hasSpace) {
      equalIndex++;
    }

    return line.substring(nameStartIndex, equalIndex);

  }

  constructor() { }
}
