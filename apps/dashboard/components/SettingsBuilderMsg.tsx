import React, { useEffect, useRef } from 'react';

import { toBase64, toUtf8 } from '@cosmjs/encoding';
import Editor, { OnMount } from '@monaco-editor/react';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import InputSelector from './Inputs/InputSelector';
import { Button } from './Buttons';
import { Input } from './Inputs';

const options = [
  {
    label: 'Vote Governance',
    value: JSON.stringify(
      {
        gov: {
          vote: {
            proposal_id: 0,
            vote: '"yes" | "no" | "abstain" | "no_with_veto"'
          }
        }
      },
      null,
      2
    )
  },
  {
    label: 'IBC Transfer',
    value: JSON.stringify(
      {
        ibc: {
          transfer: {
            amount: { denom: '', amount: '' },
            channel_id: '',
            timeout: { timestamp: '' },
            to_address: ''
          }
        }
      },
      null,
      2
    )
  },
  {
    label: 'Execute Contract',
    value: JSON.stringify(
      {
        wasm: {
          execute: {
            contract_addr: '',
            funds: [],
            msg: {}
          }
        }
      },
      null,
      2
    )
  },
  {
    label: 'Delegate',
    value: JSON.stringify(
      {
        staking: {
          delegate: {
            amount: { denom: '', amount: '' },
            validator: ''
          }
        }
      },
      null,
      2
    )
  },
  {
    label: 'Undelegate',
    value: JSON.stringify(
      {
        staking: {
          undelegate: {
            amount: { denom: '', amount: '' },
            validator: ''
          }
        }
      },
      null,
      2
    )
  },
  {
    label: 'Redelegate',
    value: JSON.stringify(
      {
        staking: {
          redelegate: {
            amount: { denom: '', amount: '' },
            dst_validator: '',
            src_validator: ''
          }
        }
      },
      null,
      2
    )
  }
];

const SettingsBuilderMsg: React.FC = () => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);
  const { vectis, account } = useVectis();
  const { toast, isLoading } = useToast();
  const editorRef = useRef<any>(null);

  const execute = async () => {
    const parsedMsg = JSON.parse(selectedOption.value);
    if (parsedMsg.wasm?.execute) parsedMsg.wasm.execute.msg = toBase64(toUtf8(parsedMsg.wasm.execute.msg));
    const promise = vectis.proxyExecute(account.address, [parsedMsg]);
    await toast.promise(promise);
  };

  useEffect(() => {
    const resizeMonaco = () => editorRef.current.layout({ width: 100, height: 100 });
    window.addEventListener('resize', resizeMonaco);
    return () => window.removeEventListener('resize', resizeMonaco);
  }, []);

  const handlerOnMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      <InputSelector className="w-full" options={options} value={selectedOption} onChange={setSelectedOption} />
      <div className="relative flex h-[60vh] w-full flex-col overflow-hidden rounded-md bg-white py-6  shadow-sm md:flex-1">
        <Editor
          onMount={handlerOnMount}
          language="json"
          theme="vs-white"
          width="100%"
          value={selectedOption.value}
          onChange={(v) => setSelectedOption({ label: selectedOption.label, value: v as string })}
          options={{
            scrollbar: {
              verticalScrollbarSize: 0
            },
            minimap: {
              enabled: false
            }
          }}
        />
      </div>

      <div className="absolute right-10 bottom-10 flex justify-end">
        <Button disabled={isLoading} onClick={execute}>
          Execute Message
        </Button>
      </div>
    </>
  );
};

export default SettingsBuilderMsg;
