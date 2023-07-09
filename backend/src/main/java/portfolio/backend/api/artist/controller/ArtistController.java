package portfolio.backend.api.artist.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import portfolio.backend.api.artist.entity.Artist;
import portfolio.backend.api.artist.repository.ArtistRepostiroy;
import portfolio.backend.authentication.api.entity.user.User;
import portfolio.backend.authentication.api.repository.user.UserRepository;
import portfolio.backend.authentication.api.service.UserService;
import portfolio.backend.authentication.oauth.entity.UserPrincipal;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/artists")
//@RequiredArgsConstructor
public class ArtistController {
    private final ArtistRepostiroy artistRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public ArtistController(ArtistRepostiroy artistRepository, UserRepository userRepository, UserService userService) {
        this.artistRepository = artistRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping
    public List<Artist> getArtist() {
        return artistRepository.findAll();
    }


    @PostMapping("")
    public ResponseEntity<String> createArtist(@RequestParam(value = "mainImage") MultipartFile imageFile,
                                               @RequestParam(value = "projectName") String projectName,
                                               @RequestParam(value = "description") String description,
                                               @RequestParam(value = "liked", defaultValue = "0") int liked,
                                               @RequestParam(value = "creatorArtCategory") String creatorArtCategory,
                                               @RequestParam(value = "interestCategory", required = false) String interestCategory,
                                               @RequestParam(value = "snsLink", required = false) String snsLink,
                                               @RequestParam(value = "birthdate", required = false) String birthdate,
                                               Authentication authentication) {

        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        try {
            Artist artist = new Artist();
            artist.setMainImage(imageFile.getBytes());
            artist.setProjectName(projectName);
            artist.setDescription(description);
            artist.setLiked(liked);
            artist.setCreatorArtCategory(creatorArtCategory);
            artist.setSnsLink(snsLink);

            if (interestCategory != null) {
                artist.setInterestCategory(interestCategory);
            }

            if (birthdate != null) {
                LocalDate birthdateObj = LocalDate.parse(birthdate);
                artist.setBirthdate(birthdateObj);
            }

            artist.setUser(user);
            artistRepository.save(artist);
            return ResponseEntity.ok("Artist created successfully.");

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create artist.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Artist> getArtistById(@PathVariable Long id) {
        Optional<Artist> optionalArtist = artistRepository.findById(id);

        return optionalArtist.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
