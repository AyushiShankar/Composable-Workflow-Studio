import { Position } from 'reactflow';

const JS_IDENTIFIER_REGEX = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const distributedTop = (index, total) => `${((index + 1) * 100) / (total + 1)}%`;

export const createNodeHandles = ({ id, inputs = [], outputs = [] }) => {
  const inputHandles = inputs.map((input, index) => ({
    id: `${id}-${input.key}`,
    type: 'target',
    position: Position.Left,
    style: {
      top: distributedTop(index, inputs.length),
    },
  }));

  const outputHandles = outputs.map((output, index) => ({
    id: `${id}-${output.key}`,
    type: 'source',
    position: Position.Right,
    style: {
      top: distributedTop(index, outputs.length),
    },
  }));

  return [...inputHandles, ...outputHandles];
};

export const extractTemplateVariables = (value) => {
  const matches = value.match(/{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g) || [];
  const orderedUnique = [];
  const seen = new Set();

  matches.forEach((match) => {
    const varName = match.replace(/{{\s*|\s*}}/g, '');
    if (!JS_IDENTIFIER_REGEX.test(varName)) {
      return;
    }

    if (!seen.has(varName)) {
      seen.add(varName);
      orderedUnique.push(varName);
    }
  });

  return orderedUnique;
};

export const computeTextNodeSize = (value, variableCount) => {
  const lines = value.split('\n');
  const longestLine = lines.reduce((max, line) => Math.max(max, line.length), 0);

  const width = clamp(170 + longestLine * 7, 240, 520);
  const height = clamp(
    110 + lines.length * 22 + Math.floor(value.length / 75) * 16 + variableCount * 18,
    130,
    420
  );

  return { width, height };
};
