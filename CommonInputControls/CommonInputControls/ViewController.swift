//
//  ViewController.swift
//  CommonInputControls
//
//  Created by Student03 on 2019-04-09.
//  Copyright © 2019 Student03. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBOutlet weak var toggle: UISwitch!
    
    @IBOutlet weak var slider: UISlider!
    
    @IBAction func keyboardReturn(_ sender: UITextField) {
        if let text = sender.text {
            print(text)
        }
    }
    
    @IBAction func textChanged(_ sender: UITextField) {
        if let text = sender.text {
            print(text)
        }
    }
    
    @IBAction func sliderValue(_ sender: UISlider) {
        print(sender.value)
    }
    
    @IBAction func buttonTapped(_ sender: UIButton) {
        print("Button was tapped!")
        
        if toggle.isOn {
            print("The switch is on.")
        }
        else {
            print("The switch is off.")
        }
        
        print(slider.value)
    }
    
    @IBAction func switchToggled(_ sender: UISwitch) {
        if sender.isOn {
            print("The switch has been toggled!")
        }
        else {
            print("The switch is off.")
        }
    }
}

