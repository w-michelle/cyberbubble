"use client";
import {
  Editor as DraftEditor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useState, useRef, useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

import {
  addDoc,
  serverTimestamp,
  collection,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  where,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

function Editor() {
  const initData = convertFromRaw({
    entityMap: {},
    blocks: [
      {
        key: "key",
        text: "",
        type: "unstyled",
        depth: 7,
        entityRanges: [],
        inlineStyleRanges: [],
        data: {},
      },
    ],
  });
  const [user, loading] = useAuthState(auth);
  const [docId, setDocId] = useState("");
  const initState = EditorState.createWithContent(initData);
  const [editorState, setEditorState] = useState(initState);
  const editorEndRef = useRef(null);

  const scrollToBottom = () => {
    editorEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const save = async (data) => {
    await setDoc(doc(db, "editor", docId), { userId: user.uid, content: data });
  };
  const onSave = async (contentState) => {
    const object = convertToRaw(contentState);
    const data = JSON.stringify(object);
    await save(data);
  };
  const handleChange = async (editorState) => {
    setEditorState(editorState);
    await onSave(editorState.getCurrentContent());
  };

  const getContent = async () => {
    const q = query(collection(db, "editor"), where("userId", "==", user.uid));
    let data = await getDocs(q);
    let arr = data.docs.map((doc) => ({ ...doc.data() }));
    if (arr.length !== 0) {
      let content = arr[0].content;
      try {
        let parsedContent = JSON.parse(content);
        const object = convertFromRaw(parsedContent);
        setEditorState(EditorState.createWithContent(object));
      } catch (error) {
        console.error("Error parsing JSON content:", error);
      }
    }
  };

  const initializeEditDoc = async () => {
    const collectionRef = collection(db, "editor");
    const q = query(collectionRef, where("userId", "==", user.uid));
    //check for doc id
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = snapshot.docs.map((doc) =>
        doc.id ? { ...doc.data(), id: doc.id } : ""
      );
      //if there is doc id, set it if not create a new doc to create an id
      if (arr.length === 0) {
        addDoc(collectionRef, {
          userId: user.uid,
          content: "",
        });
      } else {
        setDocId(arr[0].id);
      }
    });
    return unsubscribe;
  };
  useEffect(() => {
    scrollToBottom();
  }, [editorState]);

  useEffect(() => {
    if (user) {
      initializeEditDoc();
      getContent();
    }
  }, [user]);

  return (
    <div className="lg:mb-0 mb-4 shadow-custom rounded-xl p-3 ">
      <div className="lg:h-[430px] md:h-[350px] scrollbar bg-black h-[300px] overflow-auto text-xs text-gray-200 p-4">
        <DraftEditor
          editorState={editorState}
          onChange={handleChange}
          placeholder="just a lonely text editor waiting for you to give me some meaning . . . "
        />
        <div ref={editorEndRef} />
      </div>
    </div>
  );
}

export default Editor;
