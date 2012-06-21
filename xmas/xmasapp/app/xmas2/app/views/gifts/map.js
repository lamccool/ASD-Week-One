function (doc) {
  if (doc._id.substr(0,5) === "gift:"){
    emit(doc._id, {
    	"category;": doc.category,
    	"comments": doc.comments,
    	"amount": doc.amount,
    	"location": doc.location,
    	"store": doc.store,
    	"url": doc.url,
    	"date": doc.date
    });
  }
};