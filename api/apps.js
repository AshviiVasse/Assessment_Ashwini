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

    let newList = new EmpList({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
})

app.patch('/', (req, res) =>{
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }

        return false;
    }).then((canUpdateEmpDetails) => {
        if (canUpdateEmpDetails) {
            EmpDetails.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
})

app.delete('/', (req, res) =>{
    EmpList.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);

        // delete all the tasks that are in the deleted list
        deleteEmpDetailsFromList(removedListDoc._id);
    })
})

app.listen(3000, () => {
    console.log("Server listen 3000");
})