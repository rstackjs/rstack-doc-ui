import { ToolStack } from '@rstackjs/doc-ui/tool-stack';
import './index.scss';

export const ToolStackStory = () => (
  <>
    <h2>English</h2>
    <div style={{ margin: 20 }}>
      <div style={{ maxWidth: 1296 }}>
        <ToolStack lang="en" />
      </div>
    </div>
    <h2>中文</h2>
    <div style={{ margin: 20 }}>
      <div style={{ maxWidth: 1296 }}>
        <ToolStack lang="zh" />
      </div>
    </div>
  </>
);

export default {
  title: 'ToolStack',
};
