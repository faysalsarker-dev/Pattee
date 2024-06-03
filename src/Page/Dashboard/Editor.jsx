// /* eslint-disable react/prop-types */
// import { useMemo, useState, useCallback } from 'react';
// import { Slate, Editable, withReact } from 'slate-react';
// import  createEditor  from 'slate';
// import { withHistory } from 'slate-history';


// const Editor = () => {
//   const editor = useMemo(() => withHistory(withReact(createEditor())), []);
//   const [value, setValue] = useState([
//     {
//       type: 'paragraph',
//       children: [{ text: 'A line of text in a paragraph.' }],
//     },
//   ]);

//   const renderElement = useCallback(props => {
//     switch (props.element.type) {
//       case 'code':
//         return <CodeElement {...props} />;
//       default:
//         return <DefaultElement {...props} />;
//     }
//   }, []);

//   const renderLeaf = useCallback(props => {
//     return <Leaf {...props} />;
//   }, []);

//   return (
//     <Slate
//       editor={editor}
//       value={value}
//       onChange={newValue => setValue(newValue)}
//     >
//       <Editable
//         renderElement={renderElement}
//         renderLeaf={renderLeaf}
//         placeholder="Enter some text..."
//       />
//     </Slate>
//   );
// };

// const CodeElement = props => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = props => {
//   return <p {...props.attributes}>{props.children}</p>;
// };

// const Leaf = props => {
//   return (
//     <span
//       {...props.attributes}
//       style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
//     >
//       {props.children}
//     </span>
//   );
// };

// export default Editor;
