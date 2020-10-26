import {db} from "./firebase"

export function getAllTasks() {
  let response = db.collection('Tasks')
    .orderBy('id', 'desc')
    .get()
    .then(data => {
      let tasks = [];
      data.docs.forEach(doc => {
        tasks[`${doc.id}`] = doc.data();
      });
      return tasks
        }).catch((err) => {
          console.error(err);
          return {
            status: 500,
            json: { error: err.code}
          }
        });
  return response
};

export async function updateOrCreateTask( request ) {
  let innerRequest = request
  //if task not have id
  if (!innerRequest?.params?.id) {
    if (!innerRequest?.body) {
      return {
        json: {error: 'Body can not empty' }
      }
    }
    await db.collection('Tasks').add(innerRequest.body)
    .then(doc => {
      innerRequest = {
        params: {
          id: doc.id
        },
        body: innerRequest.body
      }
    })
    innerRequest.body.docID = innerRequest.params.id
  }

  innerRequest.body.lastModifiedTime = Date.now()
  let response = db.collection('Tasks').doc(innerRequest.params.id).get()
    .then(data => {
      return data.ref.update(request.body)
      .then(()=> {
          return {message: 'Updated successfully'};
      })
      .catch((err) => {
        return {
            status: 500,
            json: {error: err.code}
          }
      });
    })
  return response
};