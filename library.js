// library.js - Enhanced version

let cookBeans = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('beans');
    }, 1000);
  });
};

let steamBroccoli = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('broccoli');
    }, 1000);
  });
};

let cookRice = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('rice');
    }, 1000);
  });
};

let bakeChicken = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('chicken');
    }, 1000);
  });
};

// NEW FUNCTIONS ADDED:

// 1. Prepare salad
let prepareSalad = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('garden salad');
    }, 800);
  });
};

// 2. Make soup
let makeSoup = (type = 'tomato') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${type} soup`);
    }, 1200);
  });
};

// 3. Grill steak
let grillSteak = (doneness = 'medium') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${doneness} steak`);
    }, 1500);
  });
};

// 4. Bake bread
let bakeBread = (type = 'garlic') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${type} bread`);
    }, 2000);
  });
};

// 5. Prepare dessert
let prepareDessert = (type = 'chocolate cake') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${type}`);
    }, 1000);
  });
};

// 6. Make pasta
let makePasta = (type = 'spaghetti') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${type} pasta`);
    }, 1100);
  });
};

// 7. Prepare drinks
let prepareDrink = (type = 'lemonade') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${type}`);
    }, 500);
  });
};

// 8. Function with random failure (for error handling practice)
let makeSauce = (type = 'tomato') => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (success) {
        resolve(`${type} sauce`);
      } else {
        reject(`Failed to make ${type} sauce!`);
      }
    }, 900);
  });
};

// 9. Function with cancellation option
let cookVegetables = (vegetable = 'mixed vegetables') => {
  let timer;
  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve(`steamed ${vegetable}`);
    }, 1300);
  });
  
  promise.cancel = () => {
    clearTimeout(timer);
    reject('Cooking vegetables cancelled!');
  };
  
  return promise;
};

// 10. Batch cooking function
let batchCook = (item, quantity = 1) => {
  const promises = [];
  for (let i = 0; i < quantity; i++) {
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(`${item} #${i + 1}`);
        }, 800);
      })
    );
  }
  return Promise.all(promises);
};

// 11. Check pantry (synchronous utility function)
let checkPantry = () => {
  const pantry = {
    beans: 5,
    rice: 3,
    chicken: 2,
    broccoli: 4,
    flour: 2,
    tomatoes: 6
  };
  return pantry;
};

// 12. Order food function (simulating external API)
let orderFood = (item) => {
  return new Promise((resolve) => {
    const deliveryTime = Math.floor(Math.random() * 3000) + 1000; // 1-4 seconds
    setTimeout(() => {
      resolve(`Delivered: ${item}`);
    }, deliveryTime);
  });
};

module.exports = {
  cookBeans,
  steamBroccoli,
  cookRice,
  bakeChicken,
  prepareSalad,
  makeSoup,
  grillSteak,
  bakeBread,
  prepareDessert,
  makePasta,
  prepareDrink,
  makeSauce,
  cookVegetables,
  batchCook,
  checkPantry,
  orderFood
};
