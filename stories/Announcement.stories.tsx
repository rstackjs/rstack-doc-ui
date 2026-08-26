import { Announcement } from '@rstackjs/doc-ui/announcement';
import './index.scss';

export const AnnouncementStory = () => (
  <>
    <div style={{ margin: 20 }}>
      <Announcement
        href="https://rspack.rs"
        message="This is a test announcement"
        localStorageKey="test-announcement"
      />
    </div>
  </>
);

export default {
  title: 'Announcement',
};
