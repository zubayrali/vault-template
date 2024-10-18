function logFormValues(result) {
    console.log("Raw modal form values:", JSON.stringify(result, null, 2));
    return result;  // Return the result so it can still be used in the template
}

module.exports = logFormValues;
