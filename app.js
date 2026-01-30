// app.js - Enhanced version

let {
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
} = require('./library.js');

// 1. Original function (slightly improved)
async function serveDinnerAgain() {
  try {
    const foodArray = await Promise.all([
      steamBroccoli(),
      cookRice(),
      bakeChicken(),
      cookBeans()
    ]);
    
    let vegetable = foodArray[0];
    let starch = foodArray[1];
    let protein = foodArray[2];
    let side = foodArray[3];
    
    console.log(`  Dinner is served. We're having ${vegetable}, ${starch}, ${protein}, and ${side}.`);
  } catch (error) {
    console.error('Failed to serve dinner:', error);
  }
}

// 2. NEW: Serve a complete multi-course meal
async function serveMultiCourseMeal() {
  console.log('🍴 Preparing multi-course meal...');
  
  try {
    // Appetizers (parallel)
    const [appetizer1, appetizer2] = await Promise.all([
      prepareSalad(),
      makeSoup('cream of mushroom')
    ]);
    
    // Main course (sequential with sauce dependency)
    const pasta = await makePasta('fettuccine');
    const sauce = await makeSauce('alfredo');
    const protein = await grillSteak('medium rare');
    
    // Sides (parallel)
    const [bread, vegetables] = await Promise.all([
      bakeBread('french'),
      steamBroccoli()
    ]);
    
    // Dessert and drink (parallel)
    const [dessert, drink] = await Promise.all([
      prepareDessert('tiramisu'),
      prepareDrink('wine')
    ]);
    
    console.log('\n Multi-course meal served!');
    console.log(` Appetizers: ${appetizer1} and ${appetizer2}`);
    console.log(` Main: ${pasta} with ${sauce} and ${protein}`);
    console.log(` Sides: ${bread} and ${vegetables}`);
    console.log(` Dessert: ${dessert}`);
    console.log(` Drink: ${drink}`);
    
  } catch (error) {
    console.error(' Failed to prepare meal:', error);
  }
}

// 3. NEW: Handle errors gracefully
async function cookWithErrorHandling() {
  console.log(' Cooking with error handling...');
  
  try {
    const [rice, chicken, sauce] = await Promise.all([
      cookRice(),
      bakeChicken(),
      makeSauce().catch(error => {
        console.warn(`  Sauce failed, using backup: ${error}`);
        return 'store-bought sauce'; // Fallback
      })
    ]);
    
    console.log(` Successfully cooked: ${rice}, ${chicken}, and ${sauce}`);
    
  } catch (error) {
    console.error(' Critical cooking error:', error);
  }
}

// 4. NEW: Race between cooking and ordering
async function raceCookingVsOrdering() {
  console.log(' Racing: Cooking vs Ordering...');
  
  try {
    const winner = await Promise.race([
      bakeChicken().then(() => 'Home-cooked chicken'),
      orderFood('KFC chicken').then(() => 'Delivered chicken')
    ]);
    
    console.log(` Winner: ${winner}!`);
    
  } catch (error) {
    console.error('Race failed:', error);
  }
}

// 5. NEW: Batch cooking for a party
async function cookForParty(guests = 5) {
  console.log(` Cooking for ${guests} guests...`);
  
  try {
    const [chickenBatch, riceBatch, beansBatch] = await Promise.all([
      batchCook('chicken', guests),
      batchCook('rice', guests),
      batchCook('beans', guests)
    ]);
    
    console.log(` Prepared for party:`);
    console.log(`   Chicken: ${chickenBatch.length} pieces`);
    console.log(`   Rice: ${riceBatch.length} bowls`);
    console.log(`   Beans: ${beansBatch.length} servings`);
    
  } catch (error) {
    console.error('Party cooking failed:', error);
  }
}

// 6. NEW: Check pantry before cooking
async function cookWithPantryCheck() {
  console.log(' Checking pantry first...');
  
  const pantry = checkPantry();
  console.log('Pantry inventory:', pantry);
  
  if (pantry.chicken > 0 && pantry.rice > 0) {
    try {
      const [chicken, rice] = await Promise.all([bakeChicken(), cookRice()]);
      console.log(` Cooking with pantry items: ${chicken} and ${rice}`);
      
      // Update pantry (in real app, you'd persist this)
      pantry.chicken--;
      pantry.rice--;
      console.log('Updated pantry:', pantry);
      
    } catch (error) {
      console.error('Cooking failed:', error);
    }
  } else {
    console.log(' Not enough ingredients in pantry!');
  }
}

// 7. NEW: Cancel cooking if takes too long
async function cookWithTimeout() {
  console.log('  Cooking with timeout...');
  
  try {
    const vegetables = cookVegetables();
    
    // Set a timeout to cancel cooking
    const timeout = new Promise((_, reject) => {
      setTimeout(() => reject('Cooking timeout!'), 1000);
    });
    
    const result = await Promise.race([vegetables, timeout]);
    console.log(` Cooked: ${result}`);
    
  } catch (error) {
    console.log(` ${error}`);
    // Cancel the vegetables promise
    const vegetables = cookVegetables();
    vegetables.cancel?.();
  }
}

// 8. NEW: Sequential cooking with progress updates
async function cookSequentially() {
  console.log('🔄 Cooking sequentially...');
  
  const steps = [
    { name: 'Prepare ingredients', time: 500 },
    { name: 'Cook rice', func: cookRice },
    { name: 'Steam vegetables', func: steamBroccoli },
    { name: 'Bake chicken', func: bakeChicken },
    { name: 'Prepare salad', func: prepareSalad }
  ];
  
  for (const [index, step] of steps.entries()) {
    console.log(`Step ${index + 1}/${steps.length}: ${step.name}`);
    
    if (step.func) {
      await step.func();
    } else {
      await new Promise(resolve => setTimeout(resolve, step.time));
    }
  }
  
  console.log(' All steps completed sequentially!');
}

// 9. NEW: AllSettled - See what succeeded/failed
async function cookAllSettled() {
  console.log(' Cooking with Promise.allSettled...');
  
  const results = await Promise.allSettled([
    cookRice(),
    makeSauce(), // Might fail
    bakeChicken(),
    makeSauce('spicy') // Might fail
  ]);
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  console.log(` Successful: ${successful.length}`);
  console.log(` Failed: ${failed.length}`);
  
  successful.forEach((result, i) => {
    console.log(`   ${i + 1}. ${result.value}`);
  });
  
  if (failed.length > 0) {
    console.log('Failed items:');
    failed.forEach((result, i) => {
      console.log(`   ${i + 1}. ${result.reason}`);
    });
  }
}

// 10. NEW: Restaurant simulation
async function runRestaurant() {
  console.log('\n ===== RESTAURANT SIMULATION =====');
  
  // Check pantry first
  await cookWithPantryCheck();
  
  // Serve a basic dinner
  await serveDinnerAgain();
  
  // Try multi-course meal
  await serveMultiCourseMeal();
  
  // Show error handling
  await cookWithErrorHandling();
  
  // Race example
  await raceCookingVsOrdering();
  
  // Batch cooking
  await cookForParty(3);
  
  // Sequential cooking
  await cookSequentially();
  
  // AllSettled example
  await cookAllSettled();
  
  console.log('\n✅ Restaurant simulation complete!');
}

// Run all functions
async function main() {
  console.log('👨‍🍳 Starting cooking simulation...\n');
  

  // Uncomment what you want to test:
  
  // await serveDinnerAgain();
  // await serveMultiCourseMeal();
  // await cookWithErrorHandling();
  // await raceCookingVsOrdering();
  // await cookForParty(3);
  // await cookWithPantryCheck();
  // await cookWithTimeout();
  // await cookSequentially();
  // await cookAllSettled();
  
  // Or run the complete restaurant simulation:
  await runRestaurant();
}

// Execute main function with error handling
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
