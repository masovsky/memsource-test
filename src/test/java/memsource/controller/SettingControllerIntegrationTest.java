package memsource.controller;

import memsource.MemsourceApplication;
import memsource.model.Setting;
import memsource.repository.SettingRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = MemsourceApplication.class)
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = SecurityAutoConfiguration.class)
@AutoConfigureTestDatabase
public class SettingControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private SettingRepository repository;

    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    @Test
    public void readEmptySetting() throws Exception {
        mvc.perform(get("/setting/read"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("name", is("")))
                .andExpect(jsonPath("password", is("")));
    }

    @Test
    public void readSetting() throws Exception {
        createSettingInDb();
        mvc.perform(get("/setting/read"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("name", is("name")))
                .andExpect(jsonPath("password", is("password")));
    }

    @Test
    public void saveSetting() throws Exception {
        Assertions.assertNull(repository.findById(Setting.SETTING_ID).orElse(null));
        Setting setting = new Setting();
        setting.setName("name");
        setting.setPassword("password");
        mvc.perform(post("/setting/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(setting)))
                .andExpect(status().isOk());
        Setting savedSetting = repository.findById(Setting.SETTING_ID)
                .orElseThrow(() -> new AssertionError("Missing setting"));
        Assertions.assertEquals(setting, savedSetting);
    }

    @Test
    public void updateSetting() throws Exception {
        createSettingInDb();
        Setting settingUpdate = new Setting();
        settingUpdate.setName("new name");
        settingUpdate.setPassword("new password");
        mvc.perform(post("/setting/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(JsonUtil.toJson(settingUpdate)))
                .andExpect(status().isOk());
        Setting savedSetting = repository.findById(Setting.SETTING_ID)
                .orElseThrow(() -> new AssertionError("Missing setting"));
        Assertions.assertEquals(savedSetting, settingUpdate);
    }

    private void createSettingInDb() {
        Setting setting = new Setting();
        setting.setName("name");
        setting.setPassword("password");
        repository.save(setting);
    }
}
