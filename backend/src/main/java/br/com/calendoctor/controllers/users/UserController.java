package br.com.calendoctor.controllers.users;

import br.com.calendoctor.entities.user.DTOs.RegisterDTO;
import br.com.calendoctor.entities.user.User;
import br.com.calendoctor.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/update")
    public ResponseEntity register(@RequestBody User user) {
        var newUser = userService.save(user);

        return ResponseEntity.ok(newUser);
    }

}
