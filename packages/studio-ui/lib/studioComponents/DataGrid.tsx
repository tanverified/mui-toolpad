import * as React from 'react';
import { DataGrid as DataGridComponent, DataGridProps } from '@mui/x-data-grid';
import type { StudioComponentDefinition } from '../types';
import { useDataQuery } from '../components/PageViewLegacy/useDataQuery';
import { STUDIO_PROPS } from '../constants';

interface DataGridWithQueryProps extends DataGridProps {
  studioDataQuery: string | null;
}

function FixedSizeGrid(props: DataGridWithQueryProps) {
  const dataGridProps = { ...props };
  const rootProps: any = {};

  STUDIO_PROPS.forEach((prop) => {
    rootProps[prop] = (dataGridProps as any)[prop];
    delete (dataGridProps as any)[prop];
  });

  const queryProps = useDataQuery(dataGridProps.studioDataQuery);

  return (
    <div {...rootProps} style={{ height: 350, width: '100%' }}>
      <DataGridComponent {...dataGridProps} {...queryProps} />
    </div>
  );
}

const DataGrid: StudioComponentDefinition<DataGridWithQueryProps> = {
  Component: React.memo(FixedSizeGrid),
  props: {
    rows: { type: 'DataGridRows', defaultValue: [] },
    columns: {
      type: 'DataGridColumns',
      defaultValue: [],
    },
    studioDataQuery: {
      type: 'DataQuery',
      defaultValue: null,
    },
  },
  render(context, node, resolvedProps) {
    context.addImport('@mui/x-data-grid', 'DataGrid', 'DataGrid');

    const { studioDataQuery, ...other } = resolvedProps;
    return `
      <div ${context.renderRootProps(node.id)} style={{ height: 350, width: '100%' }}>
        <DataGrid
          ${context.renderProps(other)}
          {...${studioDataQuery}}
        />
      </div>
    `;
  },
};

export default DataGrid;