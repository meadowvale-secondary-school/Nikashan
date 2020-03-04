/*:
 ## App Exercise - Workout Functions
 
 >These exercises reinforce Swift concepts in the context of a fitness tracking app.
 
 A `RunningWorkout` struct has been created for you below. Add a method on `RunningWorkout` called `postWorkoutStats` that prints out the details of the run. Then create an instance of `RunningWorkout` and call `postWorkoutStats()`.
 */
struct RunningWorkout {
    var distance: Double
    var time: Double
    var elevation: Double
    func postWorkoutStats() {
        print("Distance: \(distance)m, Time: \(time) miniutes, Elevation: \(elevation)m")
    }
}
struct Steps {
    var steps: Int
    var goal: Int
}

var someWorkout = RunningWorkout(distance: 600, time: 15, elevation: 25)
someWorkout.postWorkoutStats()
//: [Previous](@previous)  |  page 6 of 10  |  [Next: Exercise - Computed Properties and Property Observers](@next)
