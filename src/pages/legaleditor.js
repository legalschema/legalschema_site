/* React */
import React, { useCallback, useEffect, useState } from "react";
import { createStore } from "redux";

/* Accord Project */
import { SlateTransformer } from "@accordproject/markdown-slate";
import { CiceroMarkTransformer } from "@accordproject/markdown-cicero";

import ContractEditor from "@accordproject/ui-contract-editor";
import { getChildren } from "@accordproject/ui-contract-editor";
import { Template, Clause } from "@accordproject/cicero-core";

/* Slate */
import { Editor, Node, Transforms } from "slate";
import { v4 as uuid } from 'uuid';

import styled from "styled-components";

const slateTransformer = new SlateTransformer();

const ADD_TEMPLATE = "ADD_TEMPLATE";
const ADD_EDITOR = "ADD_EDITOR";

const addTemplate = (template) => ({ type: ADD_TEMPLATE, template });
const addEditor = (editor) => ({ type: ADD_EDITOR, editor });

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEMPLATE:
      console.log("Added these templates to the store: ", action.template);
      return {
        ...state,
        [`legal://${action.template.getIdentifier()}`]: action.template
      };
    case ADD_EDITOR:
      console.log("Added editor to the store!");
      return {
        ...state,
        editor: action.editor
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

const action = (msg) => console.log(msg);

const Wrapper = styled.div`
  border-radius: 3px;
  border: 1px solid gray;
  margin: 50px;
  padding: 20px;
  width: min-content;
  blockquote {
    width: 80%;
    margin: 10px auto;
    padding: 1em 10px 1.2em 15px;
    border-left: 3px solid #484848;
    line-height: 1.5em;
    position: relative;
  }
`;

const markdownText = `# Warranty Terms
Parts and labor are covered under the negotiated terms, set out below.`;

const LegalEditor = () => {
  const lockText = true;
  const readOnly = false;
  const [slateValue, setSlateValue] = useState(() => {
    return slateTransformer.fromMarkdown(markdownText).document.children;
  });
  const [editor, setEditor] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    if(editor) {
      console.log("Loading template...");
      Template.fromUrl('https://templates.legalschema.org/archives/bill-of-lading@0.1.0.cta')
        .then((template) => {
          store.dispatch(addTemplate(template));

          console.log('Sample', template.getMetadata().getSample());
          const clause = new Clause(template);
          clause.parse(template.getMetadata().getSample());
          console.log('Clause', clause);
          const slateValueNew = clause.draft({ format: "slate" });
          console.log("slateValueNew", slateValueNew);

          const extraMarkdown = `This is some more text after a clause. Test moving a clause by dragging it or by using the up and down arrows.`;
          const extraText = slateTransformer.fromMarkdown(extraMarkdown);
          const slateClause = [
            {
              children: slateValueNew.document.children,
              data: {
                src: "legal://" + template.getIdentifier(),
                name: uuid()
              },
              object: "block",
              type: "clause"
            },
            ...extraText.document.children
          ];
          console.log("Inserted nodes", slateClause);
          Transforms.insertNodes(editor, slateClause, {
            at: Editor.end(editor, [])
          });
        })
        .catch((err) => console.log(err));
    }
  }, [editor]);

  const onContractChange = useCallback(
    (value) => {
      setSlateValue(value);
      const markdown = slateTransformer.toMarkdownCicero({
        document: { children: value }
      });
    },
    [editor]
  );

  const clausePropsObject = {
    CLAUSE_DELETE_FUNCTION: action("Clause -> Deleted"),
    CLAUSE_EDIT_FUNCTION: action("Clause -> Edit"),
    CLAUSE_TEST_FUNCTION: action("Clause -> Test")
  };

  const augmentEditor = useCallback((slateEditor) => {
    setEditor(slateEditor);
    store.dispatch(addEditor(slateEditor));
    return slateEditor;
  }, []);

  const parseClause = useCallback(
    async (clauseNode) => {
      if (!clauseNode.data.src) {
        return Promise.resolve(true);
      }
      const SLICE_INDEX_1 = clauseNode.data.src.lastIndexOf("/") + 1;
      const SLICE_INDEX_2 = clauseNode.data.src.indexOf("@");
      const TEMPLATE_NAME = clauseNode.data.src.slice(
        SLICE_INDEX_1,
        SLICE_INDEX_2
      );

      try {
        const newReduxState = store.getState();
        const value = {
          document: {
            children: clauseNode.children
          }
        };
        const text = slateTransformer.toMarkdownCicero(value);
        const ciceroClause = new Clause(newReduxState[clauseNode.data.src]);
        ciceroClause.parse(text);
        const parseResult = ciceroClause.getData();

        const hasFormulas = getChildren(
          clauseNode,
          (n) => n.type === "formula"
        );
        let draftedSlateNode = null;

        if (hasFormulas) {
          const slateDom = await ciceroClause.draft({ format: "slate" });
          draftedSlateNode = JSON.parse(JSON.stringify(clauseNode));
          draftedSlateNode.children = slateDom.document.children;
        }

        return Promise.resolve({
          node: hasFormulas ? draftedSlateNode : null,
          operation: hasFormulas ? "update_formulas" : null,
          error: null
        });
      } catch (err) {
        return Promise.resolve({
          node: null,
          operation: null,
          error: err
        });
      }
    },
    [editor]
  );

  let timeoutId;
  const debouncedParseClause = (node) =>
    new Promise((resolve) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        (n) => {
          resolve(parseClause(n));
        },
        500,
        node
      );
    });

  return (
    <Wrapper>
      <ContractEditor
        value={slateValue}
        onChange={onContractChange}
        lockText={lockText}
        readOnly={readOnly}
        clauseProps={clausePropsObject}
        loadTemplateObject={action("Template -> Load")}
        pasteToContract={action("Contract -> Paste")}
        onClauseUpdated={debouncedParseClause}
        augmentEditor={augmentEditor}
      />
    </Wrapper>
  );
};

export default LegalEditor;
