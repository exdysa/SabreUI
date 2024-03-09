import { useAppStore } from "@/store";
import { Widget } from "@/types";
import { checkInput } from "@/utils";
import React, { useMemo } from "react";
import { NodeProps } from "reactflow";
import { shallow } from "zustand/shallow";
import NodeImgPreview from "./node-img-preview";
import NodeInputs from "./node-inputs";
import NodeOutputs from "./node-ouputs";
import NodeParams from "./node-params";

const SdNode: React.FC<NodeProps<Widget>> = ({
  id,
  data: { input, output },
}) => {
  const { imagePreviews, inputImgPreviews } = useAppStore(
    (st) => ({
      imagePreviews: st.graph?.[id]?.images
        ?.map((image, index) => ({ image, index }))
        .filter(Boolean),
      inputImgPreviews: [
        {
          image: {
            filename: st.onGetNodeFieldsData(id, "image"),
            type: "input",
          },
          index: 0,
        },
      ].filter((i) => i.image.filename),
    }),
    shallow
  );

  const params = useMemo(() => {
    const paramsList: any[] = [];
    Object.entries(input.required).forEach(([property, inputType]) => {
      if (checkInput.isParameterOrList(inputType)) {
        paramsList.push({
          name: property,
          type: inputType[0],
          input: inputType,
        });
      }
    });
    return paramsList;
  }, [input]);

  const inputs = useMemo(() => {
    const inputsList: any[] = [];
    Object.entries(input.required).forEach(([property, inputType]) => {
      if (!checkInput.isParameterOrList(inputType)) {
        inputsList.push({ name: property, type: inputType[0] });
      }
    });
    return inputsList;
  }, [input]);

  return (
    <>
      <div className="flex items-stretch justify-stretch w-full space-x-6">
        <NodeInputs data={inputs} />
        <NodeOutputs data={output} />
      </div>
      <NodeParams data={params} nodeId={id} />
      <NodeImgPreview data={imagePreviews || inputImgPreviews} />
    </>
  );
};

export default React.memo(SdNode);
