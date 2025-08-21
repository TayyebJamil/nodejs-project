// Refactor a class that handles both data logic and UI rendering to 
// follow the Single Responsibility Principle.
// 7. Single Responsibility Principle (SRP)
class UserData {
    constructor(name) { this.name = name; }
  }
  class UserUI {
    render(user) { console.log(`<div>${user.name}</div>`); }
  }
  const u = new UserData('Sara');
  const ui = new UserUI();
  ui.render(u); // <div>Sara</div>