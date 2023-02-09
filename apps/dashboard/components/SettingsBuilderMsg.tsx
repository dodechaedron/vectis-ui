import React, { useEffect, useRef } from 'react';

import { toBase64, toUtf8 } from '@cosmjs/encoding';
import Editor, { OnMount } from '@monaco-editor/react';

import { useVectis } from '~/providers';
import { useToast } from '~/hooks';

import { Button } from './Buttons';
import { Input } from './Inputs';

const SettingsBuilderMsg: React.FC = () => {
  const [code, setCode] = React.useState<string | undefined>('');
  const [contractAddress, setContractAddress] = React.useState<string>('');
  const { signingClient, account } = useVectis();
  const { toast, isLoading } = useToast();
  const editorRef = useRef<any>(null);

  const execute = async () => {
    console.log(contractAddress);
    const msg = {
      wasm: {
        execute: {
          contract_addr: contractAddress,
          funds: [],
          msg: toBase64(toUtf8(code as string))
        }
      }
    };
    const promise = signingClient.proxyExecute(account.address, [msg]);
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
      <Input placeholder="Contract Address" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
      <div className="flex flex-col h-[60vh] md:flex-1 w-full bg-white rounded-md shadow-sm  py-6 overflow-hidden">
        <Editor
          onMount={handlerOnMount}
          language="json"
          theme="vs-white"
          width="100%"
          defaultValue={JSON.stringify({ message: 'example' }, null, 2)}
          onChange={setCode}
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
      <div className="flex justify-end">
        <Button disabled={isLoading} onClick={execute}>
          Execute
        </Button>
      </div>
    </>
  );
};

export default SettingsBuilderMsg;
