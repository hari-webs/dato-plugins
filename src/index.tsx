import { connect, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- note '/client'

const COLORS = [
  { name: 'Red', value: '#E74C3C' },
  { name: 'Green', value: '#27AE60' },
  { name: 'Blue', value: '#3498DB' }
];

function ColorList({ ctx }: { ctx: RenderFieldExtensionCtx }) {
  const value = ctx.formValues[ctx.fieldPath] as string;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <select
        value={value || ''}
        onChange={(e) => ctx.setFieldValue(ctx.fieldPath, e.target.value)}
      >
        <option value="">Select color...</option>
        {COLORS.map((c) => (
          <option key={c.value} value={c.value}>
            {c.name}
          </option>
        ))}
      </select>
      {value && (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: value,
            border: '1px solid #ccc'
          }}
        />
      )}
    </div>
  );
}

connect({
  renderFieldExtension(_, ctx) {
    const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render(<ColorList ctx={ctx} />);
  }
});
