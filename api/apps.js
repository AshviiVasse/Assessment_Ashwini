const express = require ('express');

const app = express();

const { EmpList, EmpDetails } = require('./db/models');

app.get('/emp-list', authenticate, (req, res) =>{
    EmpList.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})

app.post('/', authenticate, (req, res) =>{
    let title = req.body.title;

    let newList = new Empist({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
})

app.patch('/', (req, res) =>{
    EmpList.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });
})

app.delete('/', (req, res) =>{
    EmpList.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        // delete all the tasks that are in the deleted list
        deleteTasksFromList(removedListDoc._id);
    })
})

app.listen(3000, () => {
    console.log("Server listen 3000");
})