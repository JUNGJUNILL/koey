
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const ToastEditor=()=>{

    return (
        <>
            <Editor
                    initialValue="hello react editor world!"
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    useCommandShortcut={false}
                    language="ko-KR"
                />
        </>
    )
}

export default ToastEditor; 