const replace = require("replace-in-file");

// See https://github.com/pmndrs/react-spring/issues/1078#issuecomment-692000408

const removeAllSideEffectsFalseFromReactSpringPackages = async () => {
  try {
    await replace({
      files: "node_modules/@react-spring/*/package.json",
      from: `"sideEffects": false`,
      to: `"sideEffects": true`,
    });
  } catch (e) {
    console.log(
      'error while trying to remove string "sideEffects:false" from react-spring packages',
      e
    );
  }
};

removeAllSideEffectsFalseFromReactSpringPackages();
