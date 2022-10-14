const container = /* #__PURE__ */ document.createElement('div');
export function createElement(template: string) {
  container.innerHTML = template;
  return container.firstElementChild!;
}
