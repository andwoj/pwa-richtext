/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Builder } from '@builder.io/sdk';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-size">
      <option value="1">Size 1</option>
      <option value="2">Size 2</option>
      <option value="3" selected>
        Size 3
      </option>
      <option value="4">Size 4</option>
    </select>
    <select className="ql-font">
      <option value="light">light</option>
      <option value="normal" selected>
        normal
      </option>
      <option value="bold">bold</option>
    </select>
    <select className="ql-align" />
    <button className="ql-clean" />
  </div>
);

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['1', '2', '3', '4'];
Quill.register(Size, true);

const Font = Quill.import('formats/font');
Font.whitelist = ['light', 'normal', 'bold'];
Quill.register(Font, true);

const modules = {
  toolbar: {
    container: '#toolbar',
  },
};

const formats = ['header', 'bold', 'italic', 'underline', 'size', 'font'];

interface TextProps {
  value: string;
  onChange: () => void;
}

function RichTextEditor(props: TextProps) {
  return (
    <div className="text-editor">
      <CustomToolbar />
      <ReactQuill
        theme="snow"
        value={props.value}
        onChange={props.onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

Builder.registerEditor({
  /**
   * Here we override the built-in richtext editor.
   */
  name: 'richText',
  component: RichTextEditor,
});
