<%*
const checkboxTypes = [
  { symbol: '[ ]', name: 'to-do', type: 'TODO' },
  { symbol: '[/]', name: 'incomplete', type: 'IN_PROGRESS' },
  { symbol: '[x]', name: 'done', type: 'DONE' },
  { symbol: '[-]', name: 'canceled', type: 'CANCELLED' },
  { symbol: '[>]', name: 'forwarded', type: 'TODO' },
  { symbol: '[<]', name: 'scheduling', type: 'TODO' },
  { symbol: '[?]', name: 'question', type: 'TODO' },
  { symbol: '[!]', name: 'important', type: 'TODO' },
  { symbol: '[*]', name: 'star', type: 'TODO' },
  { symbol: '["]', name: 'quote', type: 'TODO' },
  { symbol: '[l]', name: 'location', type: 'TODO' },
  { symbol: '[b]', name: 'bookmark', type: 'TODO' },
  { symbol: '[i]', name: 'information', type: 'TODO' },
  { symbol: '[$]', name: 'savings', type: 'TODO' },
  { symbol: '[I]', name: 'idea', type: 'TODO' },
  { symbol: '[p]', name: 'pros', type: 'TODO' },
  { symbol: '[c]', name: 'cons', type: 'TODO' },
  { symbol: '[f]', name: 'fire', type: 'TODO' },
  { symbol: '[k]', name: 'key', type: 'TODO' },
  { symbol: '[w]', name: 'win', type: 'TODO' },
  { symbol: '[u]', name: 'up', type: 'TODO' },
  { symbol: '[d]', name: 'down', type: 'TODO' }
];

const choice = await tp.system.suggester(
  (item) => `${item.symbol} - ${item.name} (${item.type})`,
  checkboxTypes,
  false,
  'Select checkbox type'
);

if (choice) {
  tR += choice.symbol + ' ';
}
%>