import { PanelPlugin, FieldConfigProperty } from '@grafana/data';
import { standardOptionsCompat } from 'grafana-plugin-support';
import { SankeyOptions } from './types';
import { SankeyPanel } from './SankeyPanel';

// import { standardOptionsCompat } from 'grafana-plugin-support';

/**
 * Grafana panel plugin main module
 *
 * @param {*} { panel: React.ComponentType<PanelProps<SankeyOptions>> | null }
 * @return {*} { builder: PanelOptionsEditorBuilder<SankeyOptions> }
 */
const buildStandardOptions = (): any => {
  const options = [
    FieldConfigProperty.Decimals,
    FieldConfigProperty.Unit,
    // FieldConfigProperty.Color,
  ];

  return standardOptionsCompat(options);
};

const monochromeBool = (monochrome: boolean) => (config: SankeyOptions) => config.monochrome === monochrome;

export const plugin = new PanelPlugin<SankeyOptions>(SankeyPanel)
  .setPanelOptions((builder) => {
    builder
      .addBooleanSwitch({
        path: 'monochrome',
        name: 'Single Link color only',
        defaultValue: false,
      })
      .addColorPicker({
        path: 'color',
        name: 'Link Color',
        showIf: monochromeBool(true),
        defaultValue: 'blue',
      })
      .addColorPicker({
        path: 'textColor',
        name: 'Text color',
        defaultValue: 'black',
      })
      .addColorPicker({
        path: 'nodeColor',
        name: 'Node color',
        defaultValue: 'grey',
      })
      .addSliderInput({
        path: 'nodeWidth',
        name: 'Node width',
        defaultValue: 30,
        settings: {
          min: 5,
          max: 100,
          step: 1,
        },
      })
      .addSliderInput({
        path: 'nodePadding',
        name: 'Node padding',
        defaultValue: 30,
        settings: {
          min: 1,
          max: 100,
          step: 1,
        },
      })
      .addSliderInput({
        path: 'iteration',
        name: 'Layout iterations',
        defaultValue: 7,
        settings: {
          min: 1,
          max: 30,
          step: 1,
        },
      });
  })
  .useFieldConfig({
    standardOptions: buildStandardOptions(),
  });
