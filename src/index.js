import properties from '@sitevision/api/server/Properties';
import events from '@sitevision/api/common/events';
import resourceLocatorUtil from '@sitevision/api/server/ResourceLocatorUtil';
import storage from '@sitevision/api/server/storage';
const dataStore = storage.getCollectionDataStore('feedback');

events.on('sv:publishing:publish', (options) => {
  // Get the feedback posts to the pageId
  // 100 can easily be changed to all
  const feedbackPosts = dataStore.find(`ds.analyzed.pageId:${options.node}`, 100).toArray();
  for (let i = 0; i < feedbackPosts.length; i++) {
    if (feedbackPosts[i].newPost === true) {
      const newObject = {
        ...feedbackPosts[i],
        newPost: false,
      };
        
      try {
        // Updated an item in the db with newPost true to false
        dataStore.set(feedbackPosts[i].dsid, newObject)
      } catch (e) {
        // Error handling
        console.log('Error: ', e)
      }
    }
  }

});