import React from "react";

type AttributesList = {
  [key: string]: string;
};

/**
 * Iterating the Element.attributes map is a bit odd
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
 * MDN suggests using `for..of` but codesandbox's TS setup raises errors on that usage
 *
 * Instead, this function converts it into an array and builds and returns an object
 * that makes the attribute names to their values
 */
function getElementAttributes(element: Element): AttributesList {
  const attributes: AttributesList = {};

  // codesandbox's TS setup also doesn't seem to support Object.fromEntries()
  // so we'll just iterate the old way instead of building the list functionally
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes.item(i);
    if (attr) {
      attributes[attr.name] = attr.value;
    }
  }

  return attributes;
}

/**
 * Parse the HTML returned from the url:
 * https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge
 * and extract the next URL from it following the outlined DOM structure
 * and attribute patterns
 */
function parseFlagUrl(html: string) {
  const dom = new DOMParser().parseFromString(html, "text/html");
  const body = dom.querySelector("body");

  if (!body || body.children?.length < 1) {
    return "invalid data";
  }

  // DOM should follow this structure
  // <code data-class="23*">
  //   <div data-tag="*93">
  //     <span data-id="*21*">
  //       <i class="char" value="VALID_CHARACTER"></i>
  //
  // Originally I used this selector:
  //   "code[data-class^='23'] div[data-tag$='93'] span[data-id*='21'] i"
  // but I updated it with the class specificity, even though there wasn't a change in the output
  // because I could see adding in structurally similar setups with <i> elements
  // that *don't* have the correct class of "char" to test the interviewer's comprehension
  const codeNodes = body.querySelectorAll(
    "code[data-class^='23'] div[data-tag$='93'] span[data-id*='21'] i[class*='char']"
  );

  if (codeNodes.length < 1) {
    return "no code nodes found";
  }

  const characters = Array.from(codeNodes).map((node) => {
    const nodeAttributes = getElementAttributes(node);
    return nodeAttributes["value"] ?? "";
  });

  const flag = characters.join("");

  return flag;
}

export const StepTwo: React.FC<{ data: string }> = ({ data }) => {
  const url = parseFlagUrl(data);
  // https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/646973

  return <div>{url}</div>;
};
