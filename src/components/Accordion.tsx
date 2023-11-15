import { Accordion } from "flowbite-react";
import React from "react";

type AccordionInputProps = {
  title?: string;
  holidays?: object[];
  checked?: boolean;
  render?: Function;
};

function AccordionInput(props: AccordionInputProps) {
  const { title, render } = props;
  return (
    <>
      <Accordion collapseAll={false}>
        <Accordion.Panel className="accordion-item">
          <Accordion.Title className="border-0 p-2 font-mainText text-sm font-bold text-black outline-none focus:ring-0 md:text-base">
            {title}
          </Accordion.Title>
          <Accordion.Content className="px-2 md:px-4 ">
            {render && render()}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
}

export default AccordionInput;
