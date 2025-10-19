# --SCRIPT-- #
# -> This script is used to manage TO-DO lists

# Dependencies
import csv
import json

def readTasks():
    with open('tasks.csv', 'r', newline='') as file:
        dict_reader = csv.DictReader(file)
        data = {
            "tasks":[]
        }
        for row in dict_reader:
            data["tasks"].append({"id":row["id"], "name":row["taskName"], "isCompleted":row["isCompleted"]})
        
        return data

def addTask(taskName):
    # for id
    id = int(readTasks().get("tasks")[-1].get("id")) + 1

    with opne('tasks.csv', 'a', newline='') as file:
        writer = csv.DictWriter()
        writer.writerow(
            {"id":id,"taskName":taskName,"isCompleted":0}
        )
        return True

def markAsComplete(tasksIndex: int):
    with open('tasks.csv', 'r') as file:
        reader = csv.DictReader(file)
        tasks = []
        for task in reader:
            tasks.append(task)
        
        tasks[tasksIndex]["isCompleted"] = 1

    fieldnames = ["id", "taskName", "isCompleted"]
    with open('tasks.csv','w') as file:
        writer = csv.DictWriter(file, fieldnames)

        writer.writeheader()
        writer.writerows(tasks)

        return True