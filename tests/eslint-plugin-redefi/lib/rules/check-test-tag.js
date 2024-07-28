module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Ensure test names with # have valid tags",
    },
    schema: [],
  },
  create(context) {
    return {
      'CallExpression[callee.name="it"], CallExpression[callee.name="describe"]'(
        node,
      ) {
        const validTags = ["#serial", "#stability", "#smoke", "#regular"];
        const testName = node.arguments[0];

        if (
          testName &&
          testName.type === "Literal" &&
          typeof testName.value === "string"
        ) {
          const tagMatches = testName.value.match(/#\w+/g);
          if (tagMatches) {
            tagMatches.forEach((tag) => {
              if (!validTags.includes(tag)) {
                context.report({
                  node: testName,
                  message: `Invalid tag ${tag}. Valid tags are ${validTags.join(", ")}.`,
                });
              }
            });
          }
        } else if (testName && testName.type === "TemplateLiteral") {
          const templateValue = testName.quasis
            .map((quasi) => quasi.value.cooked)
            .join("");
          const tagMatches = templateValue.match(/#\w+/g);
          if (tagMatches) {
            tagMatches.forEach((tag) => {
              if (!validTags.includes(tag)) {
                context.report({
                  node: testName,
                  message: `Invalid tag ${tag}. Valid tags are ${validTags.join(", ")}.`,
                });
              }
            });
          }
        }
      },
    };
  },
};
